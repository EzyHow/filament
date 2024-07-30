export default function textareaFormComponent({ initialHeight, shouldAutosize, state }) {
    return {
        height: null,

        state,

        init: function () {
            this.setInitialHeight()
            this.setUpResizeObserver()

            if (shouldAutosize) {
                this.$watch('state', () => {
                    this.resize()
                })
            }
        },

        setInitialHeight: function () {
            this.height = initialHeight + 'rem'

            if (this.$el.scrollHeight <= 0) {
                return
            }

            this.$el.style.height = this.height
        },

        resize: function () {
            this.setInitialHeight()

            if (this.$el.scrollHeight <= 0) {
                return
            }

            const newHeight = this.$el.scrollHeight + 'px'

            if (this.height === newHeight) {
                return
            }

            this.height = newHeight
            this.$el.style.height = this.height
        },

        setUpResizeObserver: function () {
            const observer = new ResizeObserver(() => {
                this.height = this.$el.style.height
            })

            observer.observe(this.$el)
        },
    }
}
