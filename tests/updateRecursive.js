import updateRecursive from '../packages/redux-toolbelt-immutable-helpers/lib/updateRecursive'
import cloneDeep from 'lodash.clonedeep'

import test from 'ava'

test('updateRecursive', t => {
  const obj = {
    prop1: {
      prop2: {
        a: 'a',
        b: 'b',
      },
      prop3: {
        prop4: {
          a: 'a',
          b: 'b',
        },
        prop5: {
          a: 'a',
          b: 'b',
        },
        prop6: {
          c: 'cVal',
        },
        otherProp: 'someValue',
        someArray: [
          '00', '01', '02',
          {'03': '03'},
          {'04': '04'},
          {'05': '05'},
        ],
        someOtherArray: [
          '000', '001',
        ],
      },
      something: 'aaa',
    },
    a: 1,
    b: 2,
    c: 3,
  }

  const objCopy = cloneDeep(obj)

  const obj2 = updateRecursive(obj, {
    prop1: {
      prop2__notRecursive__: 'newProp2Val',
      prop3: {
        prop4__notRecursive__: {
          aaa: 88,
        },
        prop5: {
          c: 'c',
        },
        prop6: obj => ({newC: `${obj.c}-${obj.c}`}),
        someArray: {
          1: 'new-01',
          2: (oldVal) => `new-${oldVal}`,
          3: {'newProp': 'newVal'},
          '4__notRecursive__': {'newProp': 'newVal'},
        },
        someOtherArray: {
          1: '001',
        },
      },
    },
  })

  t.deepEqual(obj, objCopy)

  t.deepEqual(obj2, {
    prop1: {
      prop2: 'newProp2Val',
      prop3: {
        prop4: {
          aaa: 88,
        },
        prop5: {
          a: 'a',
          b: 'b',
          c: 'c',
        },
        prop6: {
          newC: 'cVal-cVal',
        },
        otherProp: 'someValue',
        someArray: [
          '00', 'new-01', 'new-02',
          {'03': '03', 'newProp': 'newVal'},
          {'newProp': 'newVal'},
          {'05': '05'},
        ],
        someOtherArray: [
          '000', '001',
        ],
      },
      something: 'aaa',
    },
    a: 1,
    b: 2,
    c: 3,
  })

  t.is(
    obj.prop1.prop3.someOtherArray,
    obj2.prop1.prop3.someOtherArray
  )
})

const obj = {
  application: {
    users: [
      {
        id: 'user-01',
        items: [
          {id: 'item-01', price: 500, missing: true},
          {id: 'item-02', price: 400},
        ],
      },
      {
        id: 'user-02',
        items: [
          {id: 'item-03', price: 700, missing: true},
          {id: 'item-04', price: 800},
        ],
      },
    ],
    logs: [
      'log0',
      'log1',
      'log2',
    ],
  },
}

const objCopy = cloneDeep(obj)

test('updateRecursive 2', t => {
  const obj2 = updateRecursive(obj, {
    application: {
      users: {
        '0': {
          items: {
            '1': {price: 800},
          },
        },
        '1': {
          items: {
            '0__notRecursive__': {id: 'new-item-03', price: 100},
          },
        },
      },
    },
  })

  t.deepEqual(obj, objCopy)

  t.deepEqual(obj2, {
    application: {
      users: [
        {
          id: 'user-01',
          items: [
            {id: 'item-01', price: 500, missing: true},
            {id: 'item-02', price: 800},
          ],
        },
        {
          id: 'user-02',
          items: [
            {id: 'new-item-03', price: 100},
            {id: 'item-04', price: 800},
          ],
        },
      ],
      logs: [
        'log0',
        'log1',
        'log2',
      ],
    },
  })
})

test('updateRecursive 3', t => {
  const obj3 = updateRecursive(obj, {
    application: {
      logs: {
        1: () => 'log1',
      },
    },
  })

  t.deepEqual(obj, objCopy)

  t.is(obj.application, obj3.application)
  t.is(obj.logs, obj3.logs)
})
