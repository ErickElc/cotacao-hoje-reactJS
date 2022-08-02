import  { useEffect, useState } from "react";
import "./form.scss";
const url = `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,AUD-BRL,RUB-BRL,CAD-BRL,GBP-BRL,ARS-BRL`;
const Moedas = ["USD", "EUR", "CAD", "GBP", "RUB", "AUD","ARS"];

function Formulario(){
    // ESTADOS
    const [index, setIndex] = useState({ i: '0', placeholder: Moedas[0] });
    const [cotacao, setCotacao] = useState('');
    const [valor, setValor] = useState({moeda1: '', moeda2: ""});
    const [background, setBackground] = useState({flag: Moedas[0]});
    // Api
    useEffect(()=>{
        fetch(url).then((res)=> (res.json())).then((data)=>{
            var dados = [data.USDBRL.ask,data.EURBRL.ask,data.CADBRL.ask,data.GBPBRL.ask,data.RUBBRL.ask,data.AUDBRL.ask,data.ARSBRL.ask];
            let dadosFormatado = parseFloat(dados[parseInt(index.i)]).toFixed(2);
            setCotacao(dadosFormatado);
        });
    },[index])
    // Selecionar
    function selecionarMoeda(evento?: any){
        setIndex({
            i:evento.target.value,
            placeholder: Moedas[evento.target.value]
        });
        setBackground({flag: `${Moedas[evento.target.value]}`})
        setValor({ moeda1: '', moeda2: "" })
    }
    return(
        <div className="ContainerMain" id={`${background.flag}`}>
            <div className="Form">
                <form className="ContainerForm">
                    <div className="EmCima">
                        <select className="Selection" id="Selection1" >
                            <option id="Brasil">BRL</option>
                        </select>
                        <input 
                            type="number"
                            max={999999999999999}
                            id="Input1" 
                            className="inputs"
                            value={valor.moeda1}
                            onChange={(e: {target: HTMLInputElement}) => setValor( {
                                moeda1: `${(e.target.value !== '0') ? parseFloat(e.target.value) : ''}`,
                                moeda2:`${(e.target.value !== '0') ? (parseFloat(e.target.value) / parseFloat(cotacao)).toFixed(2) : ''}`
                            })}
                            placeholder={"BRL"}
                        />
            
                    </div>
                    <div>
                        <select value={index.i} onChange={(e) => {
                                selecionarMoeda(e); 
                            }}  className="Selection" id="Selection2">
                            <option id="USD" value="0">USD</option>
                            <option id="EUR" value="1">EUR</option>
                            <option id="CAD" value="2">CAD</option>
                            <option id="GBP" value="3">Libra</option>
                            <option id="RUB" value="4">RUB</option>
                            <option id="AUD" value="5">AUD</option>
                            <option id="ARS" value="6">ARS</option>
                        </select>
                        <input 
                            type="number"
                            max={999999999999999}
                            onChange={(e: {target: HTMLInputElement}) => setValor( {
                                moeda1: `${(e.target.value !== '0') ? (parseFloat(e.target.value) * parseFloat(cotacao)).toFixed(2): ''}`,
                                moeda2:`${(e.target.value !== '0') ? parseFloat(e.target.value) : ''}`
                            })}
                            value={valor.moeda2}
                            placeholder={`${index.placeholder}`}
                            id="Input2" 
                            className="inputs"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Formulario;