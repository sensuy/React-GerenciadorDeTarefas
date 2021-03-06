import React from 'react';
import ReactDOM from 'react-dom';
import AtualizarTarefa from './atualizar-tarefa';
import Tarefa from '../models/tarefa.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de atualização de tarefas', () => {

	const tarefa = new Tarefa(1, 'Nova Tarefa', false);

	beforeEach(() => {
		localStorage['tarefas'] = JSON.stringify([tarefa]);
	});

	it('Deve renderizar o componente sem erros', () => {
		const div = document.createElement('div');
		ReactDOM.render(<AtualizarTarefa id={tarefa.id} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('Deve exibir a modal de sucesso ao atualizar uma tarefa', () => {
		const { getByTestId } = render(<AtualizarTarefa id={tarefa.id} />);
		fireEvent.click(getByTestId('btn-atualizar'));
		expect(getByTestId('modal')).toHaveTextContent('Sucesso');
	});

	it('Deve atualizar uma tarefa', () => {
		const nomeTarefaAtualizada = 'Tarefa atualizada';
		const { getByTestId } = render(<AtualizarTarefa id={tarefa.id} />);
		fireEvent.change(getByTestId('txt-tarefa'), { target: { value: nomeTarefaAtualizada } });
		fireEvent.click(getByTestId('btn-atualizar'));
		const tarefasDb = JSON.parse(localStorage['tarefas']);
		expect(tarefasDb[0].nome).toBe(nomeTarefaAtualizada);
	})
})