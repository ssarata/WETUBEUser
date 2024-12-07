import ValidationError from "./validationError.js";

export default class VideoValidator {
    rules() {
        return {
            title: {
                validate: (title) => typeof title === 'string' && title.length > 3,
                message: (value) => `Le title doit être une chaîne de caractères de plus de 3 caractères. Reçu: ${value}`,
            },
            description: {
              validate: (description) => description == undefined || typeof description === 'string' && description.length > 10,
              message: (value) => `La description doit être une chaîne de caractères de plus d'au moins 10 caractères. Reçu: ${value}`,
            },
            status: {
              validate: (status) => typeof status === 'boolean',
              message: (value) => `Le status doit être un booléen. Reçu: ${value}`,
            },
            userId: {
              validate: async (userId) => typeof userId === 'number',
              message: (value) => `Le userId doit être un nombre. Reçu: ${value}`,
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
  