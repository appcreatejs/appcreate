#!/usr/bin/env node
'use strict';

/**
 *
 * AppCreate CLI
 *
 * AppCreate é um pacote para criação de projetos.
 * Este arquivo é o ponto de entrada para o CLI
 * utilizado para criar projetos e executar
 * as diversas funcionalidades existentes.
 * 
 * fim
 *
*/
const AppCreate = require('./src/AppCreate');

AppCreate.fromProcess();