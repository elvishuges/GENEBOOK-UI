// REQUIRED FIELD
export const required_field = (val) => !!val || "This field is required";
export const no_space_required = (v) =>
  v.split(" ").length <= 1 || "Only text without space";
