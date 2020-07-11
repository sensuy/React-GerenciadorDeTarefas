import React from 'react';
import ReactDOM from 'react-dom';
import AtualizarTarefa from './atualizar-tarefa';
import Tarefa from '../models/tarefa.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de atualização de tarefas', () => {

	const tarefaId = '1';
	const tarefa = new Tarefa(1, 'Nova Tarefa', false);

	beforeEach(() => {
		localStorage['tarefas'] = JSON.stringify([tarefa]);
	});

	it('Deve renderizar o componente sem erros', () => {
		const div = document.createElement('div');
		ReactDOM.render(<AtualizarTarefa id={tarefaId} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('Deve exibir a modal de sucesso ao atualizar uma tarefa', () => {
		const { getByTestId } = render(<AtualizarTarefa id={tarefa.id} />);
		fireEvent.click(getByTestId('btn-atualizar'));
	})
})