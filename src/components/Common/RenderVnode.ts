
export default {
  props: {
    vNode: {
      type: [String, Object],
      required: true,
    }
  },
  setup(props: any) {
    return () => props.vNode
  },
}