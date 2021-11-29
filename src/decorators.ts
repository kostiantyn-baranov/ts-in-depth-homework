import { makeProperty } from './functions';

export function sealed(p: string) {
    return function (target: Function): void {
        console.log(`Sealing the constructor ${p}`);
        
        Object.seal(target); // static
        Object.seal(target.prototype); // methods
    };
}

export function logger<TFunc extends Function>(target: TFunc): TFunc {
    const newConstructor: Function = function () {
        console.log('Creating new instance');
        console.log(target);
        this.age = 30;
    };
    
    newConstructor.prototype = Object.create(target.prototype);
    
    newConstructor.prototype.printLibrarian = function () {
        console.log(`Librarian name: ${this.name}, Librarian age: ${this.age}`);
    };
    
    return newConstructor as TFunc;
}

export function writable(isWritable: boolean) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        console.log(`Decorator writable: ${isWritable}`);
        descriptor.writable = isWritable;
        return descriptor;
    };
}

export function timeout(ms: number = 0) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        console.log(`Decorator timeout: ${timeout}`);
        const originalMethod = descriptor.value;
        
        descriptor.value = function (...args: any[]) {
            if (window.confirm('Are u sure?')) {
                setTimeout(() => {
                    originalMethod.apply(this, args);
                }, ms);
            }
        };
        return descriptor;
    };
}

export function logParameter(target: any, methodName: string, index: number) {
    const key = `${methodName}_decor_params_indexes`;
    if (Array.isArray(target[key])) {
        target[key].push(index);
    } else {
        target[key] = [index];
    }
}

export function logMethod(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const key = `${methodName}_decor_params_indexes`;
        const indexes = target[key];
        if (Array.isArray(indexes)) {
            args.forEach((arg, index) => {
                if (indexes.includes(index)) {
                    console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`);
                }
            });
        }
        
        originalMethod.apply(this, args);
    };
    return descriptor;
}

export function format(pref: string = 'Mr./Mrs.') {
    return function (target: any, propertyName: string) {
        makeProperty(target, propertyName, value => `${pref} ${value}`,
            value => value);
    };
}


export function positiveInteger(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalSet = descriptor.set;
    descriptor.set = function (value: number) {
        if(value <1 || !Number.isInteger(value)) {
            throw new Error('Invalid Value');
        }
    
        originalSet.call(this, value);
    }
    return descriptor;
}