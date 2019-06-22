import React from 'react'
import ExpressionRunnerPrecomputed from 'src/components/ExpressionRunnerPrecomputed'
import config from 'src/lib/runners/orhx.json'

// @ts-ignore
const Orhx = () => <ExpressionRunnerPrecomputed {...config} />

export default Orhx
