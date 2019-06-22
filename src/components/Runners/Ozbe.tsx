import React from 'react'
import ExpressionRunnerPrecomputed from 'src/components/ExpressionRunnerPrecomputed'
import config from 'src/lib/runners/ozbe.json'

// @ts-ignore
const Ozbe = () => <ExpressionRunnerPrecomputed {...config} />

export default Ozbe
