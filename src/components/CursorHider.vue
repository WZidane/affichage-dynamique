<script>
export default {
    name: 'DevicePage',
    data() {
        return {
            cursorTimer: null,
            cursorVisible: true,
        }
    },
    mounted() {
        // On écoute les mouvements de la souris pour réinitialiser le timer
        document.addEventListener('mousemove', this.resetCursorTimer)
        // On cache le curseur au chargement de la page
        this.hideCursor()
    },
    beforeDestroy() {
        // On retire l'écouteur d'événement à la destruction du component
        document.removeEventListener('mousemove', this.resetCursorTimer)
    },
    methods: {
        resetCursorTimer() {
            // Si le timer est déjà lancé, on le réinitialise
            if (this.cursorTimer) {
                clearTimeout(this.cursorTimer)
            }
            // On lance le timer pour cacher le curseur dans 1 seconde
            this.cursorTimer = setTimeout(this.hideCursor, 1000)
            // On remet le curseur visible
            this.showCursor()
        },
        hideCursor() {
            document.body.style.cursor = 'none'
            this.cursorVisible = false
        },
        showCursor() {
            document.body.style.cursor = ''
            this.cursorVisible = true
        },
    },
}
</script>