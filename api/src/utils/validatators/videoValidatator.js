import ValidationError from "./validationError.js";

export default class VideoValidator {
    rules() {
        return {
            name: {
                validate: (name) => typeof name === 'string' && name.length > 3,
                message: (value) => `Le nom doit être une chaîne de caractères de plus de 3 caractères. Reçu: ${value}`
            },
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
  