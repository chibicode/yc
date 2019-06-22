import React from 'react'
import ExpressionRunnerPrecomputed from 'src/components/ExpressionRunnerPrecomputed'
import config from 'src/lib/runners/vrwt.json'

// @ts-ignore
const Vrwt = () => <ExpressionRunnerPrecomputed {...config} />

export default Vrwt
