import { computed } from "vue";

export function useValidation() {
  const isRequired = computed(() => (val) => !!val || "Field is required");

  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const isEmail = computed(
    () => (val) => emailRegex.test(val) || "Enter a valid email address"
  );

  const isPhone = computed(() => (v) => !/[^\d]/.test(v) || "Phone is invalid");

  const isLength = {};

  isLength.min = (min) => {
    return computed(
      () => (val) => val.length >= min || `Use a minimum of ${min} characters`
    );
  };

  isLength.max = (max) => {
    return computed(
      () => (val) => val.length <= max || `Use a maximum of ${max} characters`
    );
  };

  const hasUppercase = computed(
    () => (val) =>
      /[A-Z]/.test(val) || "Must have at lease one uppercase letter"
  );

  const hasLowercase = computed(
    () => (val) =>
      /[a-z]/.test(val) || "Must have at least one lowercase letter"
  );

  const hasNumber = computed(
    () => (val) =>
      /[0-9]/.test(val) || "Your password must have at least one number"
  );

  const hasSpecialChar = computed(
    () => (val) =>
      /[!~`@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(val) ||
      "Your password must have at least one special character (!@#$^...)"
  );

  return {
    isRequired,
    isEmail,
    isPhone,
    isLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar,
    emailRegex,
  };
}
