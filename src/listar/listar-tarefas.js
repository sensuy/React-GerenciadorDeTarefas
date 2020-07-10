import React, { useState, useEffect } from 'react';
import { A } from 'hookrouter';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ItensListarTarefas from './itens-lista-tarefas';
import Paginacao from './paginacao';

function ListarTarefas() {

	const ITEMS_POR_PAG = 3;

	const [tarefas, setTarefas] = useState([]);
	const [carregarTarefas, setCarregarTarefas] = useState(true);
	const [totalItems, setTotalItems] = useState(0);
	const [paginaAtual, setPaginaAtual] = useState(1);
	const [ordenarAsc, setOrdernarAsc] = useState(false);
	const [ordernarDesc, setOrdernarDesc] = useState(false);


	useEffect(() => {
		function obterTarefas() {
			const tarefasDb = localStorage['tarefas'];
			let listaTarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
			//ordenar
			if (ordenarAsc) {
				listaTarefas.sort((t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase()) ? 1 : -1);
			} else if (ordernarDesc) {
				listaTarefas.sort((t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase()) ? 1 : -1);
			}

			//paginar
			setTotalItems(listaTarefas.length);
			setTarefas(listaTarefas.splice((paginaAtual - 1) * ITEMS_POR_PAG, ITEMS_POR_PAG));
		}
		if (carregarTarefas) {
			obterTarefas();
			setCarregarTarefas(false);
		};
	}, [carregarTarefas, paginaAtual, ordenarAsc, ordernarDesc]);

	function handleMudarPagina(pagina) {
		setPaginaAtual(pagina);
		setCarregarTarefas(true);
	}

	function handleOrdenar(event) {
		event.preventDefault();
		if (!ordenarAsc && !ordernarDesc) {
			setOrdernarAsc(true);
			setOrdernarDesc(false);
		} else if (ordenarAsc) {
			setOrdernarAsc(false);
			setOrdernarDesc(true)
		} else {
			setOrdernarAsc(false);
			setOrdernarDesc(false);
		}
		setCarregarTarefas(true);
	}

	return (
		<div className="text-center">
			<h3>Tarefas a fazer</h3>
			<Table striped bordered hover responsive data-testid="tabela">
				<thead>
					<tr>
						<th>
							<a href="/" onClick={handleOrdenar} >
								Tarefa
						</a>
						</th>
						<th>
							<A href="/cadastrar"
								className="btn btn-success btn-sm"
								data-testid="btn-nova-tarefa">
								<FontAwesomeIcon icon={faPlus} />
								&nbsp;
								Nova tarefa
							</A>
						</th>
					</tr>
				</thead>
				<tbody>
					<ItensListarTarefas
						tarefas={tarefas}
						recarregarTarefas={setCarregarTarefas}
					/>
				</tbody>
			</Table>
			<Paginacao
				totalItems={totalItems}
				itemsPorPagina={ITEMS_POR_PAG}
				paginaAtual={paginaAtual}
				mudarPagina={handleMudarPagina}
			/>
		</div>
	);
};

export default ListarTarefas;