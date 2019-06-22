import React from 'react'
import ExpressionRunnerPrecomputed from 'src/components/ExpressionRunnerPrecomputed'
import config from 'src/lib/runners/tkbr.json'

// @ts-ignore
const Tkbr = () => <ExpressionRunnerPrecomputed {...config} />

export default Tkbr
