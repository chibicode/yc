import React from 'react'
import ExpressionRunnerPrecomputed from 'src/components/ExpressionRunnerPrecomputed'
import config from 'src/lib/runners/jreq.json'

// @ts-ignore
const Jreq = () => <ExpressionRunnerPrecomputed {...config} />

export default Jreq
