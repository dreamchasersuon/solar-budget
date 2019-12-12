export const refs = {
  bill: {},
  transaction: {},
  rate: {},
  update_login: {},
  update_password: {},
  validate_password: {}
};

export default function setRef(ref) {
  refs[ref.name] = ref.ref;
}
