'use strict';

class Employee {
    constructor() {
        this.oid = 0
        this.name = ''
        this.salary = 0
        this.joinedOn = null
        this.department = null
    }

    static getModelDescriptor(apatite) {
        var object = {
            table: 'EMP',
            model: this,
            mappings: [
                {attr: 'oid', col: 'OID', pk: true, type: 'serial'},
                {attr: 'name', col: 'NAME', type: 'varchar', length: 100},
                {attr: 'salary', col: 'SALARY', type: 'decimal', length: 12, precision: 2},
                {attr: 'joinedOn', col: 'JOINEDON', type: 'date'},
                {attr: 'department', toOne: {modelName: 'Department', isLeftOuterJoin: true, fromCols: [{col: 'DEPTOID', type: 'int'}], toCols: [{table: 'DEPT', col: 'OID'}]}}
            ]
        }
        return apatite.newDescriptorFromObject(object)
    }
}

module.exports = Employee;