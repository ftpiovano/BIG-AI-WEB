(function () {
    "use strict";

    const CHAT_API_URL = window.BIGAI_CHAT_API_URL || "/api/chat";
    const STORAGE_KEY = "bigai_chat_history";
    const MAX_LEN = 1000;
    const QUICK_CHIPS = [
        "Servicios",
        "Agendar una llamada",
        "AI Strategy",
        "Voice Agents",
        "Workflow Automation"
    ];

    let messages = [];
    let pending = false;
    let lastFocused = null;

    function safeText(value) {
        return (value || "").toString();
    }

    function loadHistory() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return [];
            return parsed.filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string");
        } catch (err) {
            return [];
        }
    }

    function saveHistory() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch (err) {
            // non-blocking
        }
    }

    function createEl(tag, cls, text) {
        const el = document.createElement(tag);
        if (cls) el.className = cls;
        if (typeof text === "string") el.textContent = text;
        return el;
    }

    function trapFocus(modal, ev) {
        if (ev.key !== "Tab") return;
        const focusables = modal.querySelectorAll(
            "button:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex='-1'])"
        );
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (ev.shiftKey && document.activeElement === first) {
            ev.preventDefault();
            last.focus();
        } else if (!ev.shiftKey && document.activeElement === last) {
            ev.preventDefault();
            first.focus();
        }
    }

    function renderMessages(body) {
        body.innerHTML = "";
        if (!messages.length) {
            const intro = createEl(
                "div",
                "bigai-chat-msg bigai-chat-msg-assistant",
                "Hi, I am BIG Intelligence AI's assistant. How can I help today?"
            );
            body.appendChild(intro);
            return;
        }

        messages.forEach((m) => {
            const klass = m.role === "user" ? "bigai-chat-msg-user" : "bigai-chat-msg-assistant";
            const msg = createEl("div", "bigai-chat-msg " + klass);
            msg.textContent = safeText(m.content);
            body.appendChild(msg);
        });
        body.scrollTop = body.scrollHeight;
    }

    function addErrorMessage(body, text) {
        const msg = createEl("div", "bigai-chat-msg bigai-chat-msg-error", text);
        body.appendChild(msg);
        body.scrollTop = body.scrollHeight;
    }

    async function sendToApi(body, input, sendBtn, counter) {
        const content = input.value.trim();
        if (!content || pending) return;
        if (content.length > MAX_LEN) {
            addErrorMessage(body, "Message too long. Maximum is 1000 characters.");
            return;
        }

        pending = true;
        sendBtn.disabled = true;
        input.disabled = true;
        input.setAttribute("aria-busy", "true");

        messages.push({ role: "user", content });
        saveHistory();
        renderMessages(body);
        input.value = "";
        counter.textContent = "0 / 1000";

        try {
            const payload = {
                messages,
                metadata: {
                    page: window.location.href,
                    ts: Date.now()
                }
            };

            const res = await fetch(CHAT_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                throw new Error("Server unavailable (" + res.status + ")");
            }

            const data = await res.json();
            const reply = typeof data.reply === "string" ? data.reply : "";
            if (!reply) throw new Error("Empty response from assistant");

            messages.push({ role: "assistant", content: reply });
            saveHistory();
            renderMessages(body);
        } catch (err) {
            addErrorMessage(body, "Unable to reach assistant right now. Please try again.");
        } finally {
            pending = false;
            sendBtn.disabled = false;
            input.disabled = false;
            input.removeAttribute("aria-busy");
            input.focus();
        }
    }

    function buildWidget() {
        const fab = createEl("button", "bigai-chat-fab", "AI");
        fab.type = "button";
        fab.setAttribute("aria-label", "Open chat assistant");

        const backdrop = createEl("div", "bigai-chat-backdrop bigai-chat-hidden");
        backdrop.setAttribute("aria-hidden", "true");

        const modal = createEl("section", "bigai-chat-modal bigai-chat-hidden");
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-label", "BIG Intelligence AI assistant");

        const header = createEl("div", "bigai-chat-header");
        const title = createEl("div", "bigai-chat-title", "BIG AI Assistant");
        const actions = createEl("div", "bigai-chat-actions");
        const clearBtn = createEl("button", "bigai-chat-btn", "Clear");
        const closeBtn = createEl("button", "bigai-chat-btn", "Close");
        clearBtn.type = "button";
        closeBtn.type = "button";
        clearBtn.setAttribute("aria-label", "Clear conversation");
        closeBtn.setAttribute("aria-label", "Close chat");
        actions.appendChild(clearBtn);
        actions.appendChild(closeBtn);
        header.appendChild(title);
        header.appendChild(actions);

        const chipsWrap = createEl("div", "bigai-chat-chips");
        QUICK_CHIPS.forEach((chip) => {
            const chipBtn = createEl("button", "bigai-chat-chip", chip);
            chipBtn.type = "button";
            chipBtn.addEventListener("click", () => {
                input.value = chip;
                counter.textContent = input.value.length + " / 1000";
                input.focus();
            });
            chipsWrap.appendChild(chipBtn);
        });

        const body = createEl("div", "bigai-chat-body");
        body.setAttribute("aria-live", "polite");

        const form = createEl("form", "bigai-chat-form");
        const input = createEl("textarea", "bigai-chat-input");
        input.maxLength = MAX_LEN;
        input.placeholder = "Type your message...";
        input.setAttribute("aria-label", "Type your message");

        const sendBtn = createEl("button", "bigai-chat-send", "Send");
        sendBtn.type = "submit";
        sendBtn.setAttribute("aria-label", "Send message");

        const counter = createEl("div", "bigai-chat-counter", "0 / 1000");

        form.appendChild(input);
        form.appendChild(sendBtn);
        form.appendChild(counter);

        modal.appendChild(header);
        modal.appendChild(chipsWrap);
        modal.appendChild(body);
        modal.appendChild(form);

        document.body.appendChild(fab);
        document.body.appendChild(backdrop);
        document.body.appendChild(modal);

        function openModal() {
            lastFocused = document.activeElement;
            backdrop.classList.remove("bigai-chat-hidden");
            modal.classList.remove("bigai-chat-hidden");
            renderMessages(body);
            input.focus();
        }

        function closeModal() {
            backdrop.classList.add("bigai-chat-hidden");
            modal.classList.add("bigai-chat-hidden");
            if (lastFocused && typeof lastFocused.focus === "function") {
                lastFocused.focus();
            }
        }

        fab.addEventListener("click", openModal);
        closeBtn.addEventListener("click", closeModal);
        backdrop.addEventListener("click", closeModal);

        clearBtn.addEventListener("click", () => {
            messages = [];
            saveHistory();
            renderMessages(body);
        });

        input.addEventListener("input", () => {
            counter.textContent = input.value.length + " / 1000";
        });

        input.addEventListener("keydown", (ev) => {
            if (ev.key === "Enter" && !ev.shiftKey) {
                ev.preventDefault();
                form.requestSubmit();
            }
        });

        form.addEventListener("submit", async (ev) => {
            ev.preventDefault();
            await sendToApi(body, input, sendBtn, counter);
        });

        document.addEventListener("keydown", (ev) => {
            if (modal.classList.contains("bigai-chat-hidden")) return;
            if (ev.key === "Escape") {
                ev.preventDefault();
                closeModal();
                return;
            }
            trapFocus(modal, ev);
        });

        messages = loadHistory();
        renderMessages(body);
    }

    document.addEventListener("DOMContentLoaded", buildWidget);
})();
