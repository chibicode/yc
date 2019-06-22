import React from 'react'
import ExpressionRunnerPrecomputed from 'src/components/ExpressionRunnerPrecomputed'
import config from 'src/lib/runners/osih.json'

// @ts-ignore
const Osih = () => <ExpressionRunnerPrecomputed {...config} />

export default Osih
