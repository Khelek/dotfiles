;;; ---------------------------------------------------------------------------
;;; User Interface
;;; ---------------------------------------------------------------------------

;;; fonts

  (when (string-equal system-type "gnu/linux")
    (if (find-font (font-spec :name "Ubuntu Mono"))
        (set-default-font "Ubuntu Mono-12")
      (set-default-font "Monospace-11")))



;;; ui

  (custom-set-variables '(echo-keystrokes 0.01)
			'(inhibit-startup-screen t)
			'(linum-format " %d ")
                        '(show-paren-delay 0)
                        '(frame-title-format '("%f - " user-real-login-name "@" system-name)))
  (add-to-list 'custom-theme-load-path "~/.emacs.d/haukot/themes/")
  (load-theme 'monokai t)
  (fset 'yes-or-no-p 'y-or-n-p)
  (column-number-mode t)
  (global-linum-mode t)
  (global-hl-line-mode t)
  (menu-bar-mode t)
  (scroll-bar-mode -1)
  ;; Truncate lines everywhere
  (set-default 'truncate-lines t)
  (setq truncate-partial-width-windows nil)
  ;; Show Paren mode
  (show-paren-mode t)
  (set-face-attribute 'show-paren-match-face nil :underline t)
  ;; ---------------
  (tool-bar-mode t)
  (which-function-mode t)


;;; ---------------------------------------------------------------------------
;;; End User Interface
;;; ---------------------------------------------------------------------------




;;; ---------------------------------------------------------------------------
;;; Key Bindings
;;; ---------------------------------------------------------------------------

(global-set-key (kbd "<f6>") 'sr-speedbar-toggle)
(global-set-key (kbd "<f7>") 'fullscreen-mode-fullscreen-toggle)

;;; ---------------------------------------------------------------------------
;;; End Key Bindings
;;; ---------------------------------------------------------------------------




;;; ---------------------------------------------------------------------------
;;; Emacs Mode's
;;; ---------------------------------------------------------------------------

;; CSS and Rainbow modes 
;(defun all-css-modes() (css-mode) (rainbow-mode)) 

;; Load both major and minor modes in one call based on file type 
;(add-to-list 'auto-mode-alist '("\\.css$" . all-css-modes)) 
;(add-hook 'sass-mode-hook 'rainbow-mode)


;; Erlang mode
(add-to-list 'auto-mode-alist '("\\.erl?$" . erlang-mode)) 
(add-to-list 'auto-mode-alist '("\\.hrl?$" . erlang-mode))
;(add-hook 'erlang-mode-hook 'prog-mode)

;; Rainbow Delimiters ((()))
(add-hook 'prog-mode-hook 'rainbow-delimiters-mode)

;;;; --------------------------------------------------------------------------
;;;; Evil Mode
;;;; --------------------------------------------------------------------------
(setq evil-normal-state-tag   (propertize "N" 'face '((:background "green" :foreground "black")))
      evil-emacs-state-tag    (propertize "E" 'face '((:background "orange" :foreground "black")))
      evil-insert-state-tag   (propertize "I" 'face '((:background "red")))
      evil-motion-state-tag   (propertize "M" 'face '((:background "blue")))
      evil-visual-state-tag   (propertize "V" 'face '((:background "grey80" :foreground "black")))
      evil-operator-state-tag (propertize "O" 'face '((:background "purple"))))


(add-hook 'evil-normal-state-entry-hook 
	(lambda ()
		(keyboard-translate ?t ?j)
		(keyboard-translate ?T ?J)
		(keyboard-translate ?j ?t)
		(keyboard-translate ?J ?T)
	))

(add-hook 'evil-normal-state-exit-hook 
	(lambda ()		
		(keyboard-translate ?j ?j)
		(keyboard-translate ?J ?J)
		(keyboard-translate ?t ?t)
		(keyboard-translate ?T ?T)
	))
;;;; -----------------	---------------------------------------------------------
;;;; End Evil Mode
;;;; --------------------------------------------------------------------------
;;; ---------------------------------------------------------------------------
;;; End Emacs Mode's
;;; ---------------------------------------------------------------------------


