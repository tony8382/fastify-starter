import { test } from 'tap'
import { build } from '../helper'

test('default root route', async (t: Tap.Test) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/'
  })
  t.notMatch(JSON.parse(res.payload), { root: true })

})
