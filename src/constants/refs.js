export const refs = {
  bill: {},
  transaction: {},
  rate: {}
};

export default function setRef(ref) {
  refs[ref.name] = ref.ref;
}
