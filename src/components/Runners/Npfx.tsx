import React from 'react'
import ExpressionRunnerPrecomputed from 'src/components/ExpressionRunnerPrecomputed'
import config from 'src/lib/runners/npfx.json'

// @ts-ignore
const Npfx = () => <ExpressionRunnerPrecomputed {...config} />

export default Npfx
