export const refs = {
  bill: {},
  transaction: {}
};

export default function setRef(ref) {
  refs[ref.name] = ref.ref;
}
