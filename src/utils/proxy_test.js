console.log(":::::::::::::::::::::::");

const user = {
    name: "KONDI",
    age: 18,
    genre: "M",
}

const userProxy = new Proxy(user, {
    get(target, prop){
        // if (prop==="age"){
        //     target[prop] = target[prop]/2;            
        // }
        return Reflect.get(...arguments);
    },

    set(target, prop, value){
        return Reflect.set(...arguments);
    }
});

console.log(userProxy);
userProxy.age = 3;
console.log(userProxy.age);
console.log(userProxy.name);



