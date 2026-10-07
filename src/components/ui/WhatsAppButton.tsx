"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { companyData } from "@/data/company";
import { X, Send, Bot } from "lucide-react";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  // Show button after scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Show tooltip briefly when button first appears (only if chat is not open)
  useEffect(() => {
    if (isVisible && !isChatOpen) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 6000);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isChatOpen]);

  const whatsappNumber =
    companyData.phones.find((phone) => phone.isWhatsApp)?.code ||
    "923496014611";

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    // Use a default message if they submit empty, otherwise use their typed message
    const finalMessage =
      message.trim() ||
      "Hi! I'm interested in learning more about your apparel manufacturing services.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMessage)}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Close widget and clear input
    setIsChatOpen(false);
    setMessage("");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
          {/* Chat Window */}
          <AnimatePresence>
            {isChatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="mb-4 w-[340px] md:w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col origin-bottom-right"
              >
                {/* Header */}
                <div className="bg-[#0a0a0a] text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0a0a] rounded-full"></span>
                    </div>
                    <div>
                      <h3 className="font-bold font-sans text-sm">
                        RCI Assistant
                      </h3>
                      <p className="text-white/60 text-[11px] uppercase tracking-wider">
                        Typically replies instantly
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Chat Area */}
                <div className="p-4 bg-gray-50 h-[280px] overflow-y-auto flex flex-col gap-4">
                  <div className="text-center text-xs text-gray-400 font-sans my-2">
                    Today
                  </div>

                  {/* Bot Message 1 */}
                  <div className="flex items-end gap-2 max-w-[85%]">
                    <div className="w-6 h-6 bg-[#0a0a0a] rounded-full flex items-center justify-center shrink-0 mb-1">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-sm shadow-sm">
                      <p className="text-[13px] text-near-black font-sans leading-relaxed">
                        Hi there! 👋 Welcome to Rasheed Clothing International.
                      </p>
                    </div>
                  </div>

                  {/* Bot Message 2 */}
                  <div className="flex items-end gap-2 max-w-[85%]">
                    <div className="w-6 h-6 bg-transparent shrink-0"></div>
                    <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-sm shadow-sm">
                      <p className="text-[13px] text-near-black font-sans leading-relaxed">
                        Are you looking for custom apparel manufacturing, or do
                        you have a question about our MOQ and pricing? Let me
                        know what you need!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <form
                  onSubmit={handleSend}
                  className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]/10"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full flex items-center justify-center shrink-0 transition-colors shadow-md"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button Row */}
          <div className="flex items-center gap-3">
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && !isChatOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="hidden md:flex items-start gap-3 bg-white text-near-black p-4 rounded-2xl rounded-br-sm shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-100 max-w-[280px] origin-bottom-right"
                >
                  <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-lg">🤖</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 mb-1 tracking-wide uppercase">
                      RCI Assistant
                    </p>
                    <p className="text-sm font-sans font-medium leading-snug">
                      Hi there! 👋 Need custom apparel? I can help you with
                      quotes, MOQ, and designs.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle Button */}
            {!isChatOpen ? (
              <motion.button
                onClick={() => {
                  setIsChatOpen(true);
                  setShowTooltip(false);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => !isChatOpen && setShowTooltip(true)}
                onHoverEnd={() => setShowTooltip(false)}
                className="relative group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-2xl transition-all duration-300"
                aria-label="Open Chat"
              >
                {/* Pulsing Ring */}
                <span className="absolute inset-0 animate-ping bg-[#25D366] rounded-full opacity-75" />

                {/* WhatsApp Icon */}
                <svg
                  className="w-8 h-8 md:w-9 md:h-9 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
              </motion.button>
            ) : (
              <div className="w-14 h-14 md:w-16 md:h-16" />
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
