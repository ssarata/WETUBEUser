import ValidationError from "../validatators/validationError.js";

export default class UserValidator {
    rules() {
        return {
            name: {
                validate: (name) => typeof name === 'string' && name.length > 3,
                message: (value) => `Le nom doit être une chaîne de caractères de plus de 3 caractères. Reçu: ${value}`
            },
            email: {
                validate: (email) => typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
                message: (value) => `L'email doit être une adresse email valide. Reçu: ${value}`
            }
        };
    }

    createProxy(target = {}) {
      const validator = this;
      
      return new Proxy(target, {
        set(obj, prop, value) {
          const rules = validator.rules();
          
          if (prop in rules) {
            const rule = rules[prop];
            if (!rule.validate(value)) {
              throw new ValidationError(rule.message(value));
            }
          }
          
          Reflect.set(obj, prop, value);
          return true;
        }
      });
    }
  }
  