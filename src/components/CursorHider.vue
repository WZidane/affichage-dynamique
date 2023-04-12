<script>
export default {
    name: 'CursorHider',
    data() {
        return {
            cursorTimer: null,
            cursorVisible: true,
        }
    },
    mounted() {
        document.addEventListener('mousemove', this.resetCursorTimer)

        this.hideCursor()
    },

    methods: {
        resetCursorTimer() {
            if (this.cursorTimer) {
                clearInterval(this.cursorTimer)
            }
            this.cursorTimer = setInterval(this.hideCursor, 1000)
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