;; M-x: name-last-kbd-macro <enter> mymacro <enter>
;; M-x: insert-kbd-macro <enter> mymacro <enter>

;;; эти макросы для selenium ide html
;; трансформирует один td в строку
 (evil-set-register ?d
   [?c ?f ?> ?\" delete escape ?$ ?d ?F ?< ?r ?\" ?a ?, escape])
 (evil-set-register ?e
   [?f ?, ?a ?  escape])

;; трансформирует одну строку таблицы(одну команду с аргументами по сути) в js-массив
 (evil-set-register ?f
   [?c ?s ?t ?\[ ?j ?@ ?d ?j ?0 ?@ ?d ?j ?0 ?@ ?d ?k ?k ?k ?4 ?J ?J ?h ?x ?a ?, escape ?0 ?2 ?@ ?e down ?0])
;;;
