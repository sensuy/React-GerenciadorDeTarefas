import React from 'react';
import ReactDOM from 'react-dom';
import ConcluirTarefa from './concluir-tarefa';
import Tarefa from '../models/tarefa.model'


describe('Testar o componente concluir tarefa', () => {

	const tarefa = new Tarefa(1, 'Tarefa', false)

	it('Deve renderizar o componente sem erros', () => {
		const div = document.createElement('div');
		ReactDOM.render(<ConcluirTarefa
			tarefa={tarefa}
			recarregarTarefas={() => false}
		/>, div);
		ReactDOM.unmountComponentAtNode(div);
	})
})