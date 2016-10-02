'use strict';

class Department {
    constructor() {
        this.oid = 0;
        this.name = '';
        this.employees = [];
    }

    static getModelDescriptor(apatite) {
        var object = {
            table: 'DEPT',
            model: this,
            mappings: [
                {attr: 'oid', col: 'OID', pk: true, type: 'serial'},
                {attr: 'name', col: 'NAME', type: 'varchar', length: 100},
                {attr: 'employees', toMany: {modelName: 'Employee', toOneName: 'department', cascadeOnDelete: true, orderBy: [{attr: 'name', desc: false}]}}
            ]
        }
        return apatite.newDescriptorFromObject(object);
    }

}


module.exports = Department;