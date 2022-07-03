import  { useState } from "react";
import { IMaskInput } from 'react-imask';
import "./form.scss";
const url = `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,AUD-BRL,RUB-BRL,CAD-BRL,GBP-BRL`;
const Moedas = ["USD", "EUR", "CAD", "GBP", "RUB", "AUD"];
function Formulario(){
    const [index, setIndex] = useState({ i: '0', placeholder: Moedas[0] });
    const [cotacao, setCotacao] = useState('');
    const [valor, setValor] = useState({moeda1: '', moeda2: ''});
    fetch(url).then((res)=> (res.json())).then((data)=>{
        var dados = [data.USDBRL.ask,data.EURBRL.ask,data.CADBRL.ask,data.GBPBRL.ask,data.RUBBRL.ask,data.AUDBRL.ask];
        let dadosFormatado = parseFloat(dados[parseInt(index.i)]).toFixed(2);
        setCotacao((dadosFormatado));
    });
    function selecionarMoeda(evento: any){
        setIndex({
            i:evento.target.value,
            placeholder: Moedas[evento.target.value]
        });
        setValor({ moeda1: "", moeda2: "" })
    }
    return(
        <>
            <div className="Form">
                <i className="imagem"/>
                <form className="ContainerForm">
                    <div className="EmCima">
                        <select className="Selection" id="Selection1" >
                            <option id="Brasil">BRL</option>
                        </select>
                        <IMaskInput
                            mask={Number}
                            radix="."
                            normalizeZeros= {true}
                            max={999999999999999}
                            id="Input1" 
                            className="inputs"
                            value={valor.moeda1}
                            unmask={false} 
                            onChange={(e:any) => setValor( {
                                moeda1: `${(e.target.value == 0) ? null : e.target.value}`,
                                moeda2:`${(e.target.value == 0) ? null : (e.target.value / parseFloat(cotacao))}`
                            })}
                            placeholder={"BRL"}
                            mapToRadix={ ['.']}
                            />
                    </div>
                    <div>
                        <select value={index.i} onChange={(e) => selecionarMoeda(e)} className="Selection" id="Selection2">
                            <option id="USD" value="0">USD</option>
                            <option id="EUR" value="1">EUR</option>
                            <option id="CAD" value="2">CAD</option>
                            <option id="GBP" value="3">Libra</option>
                            <option id="RUB" value="4">RUB</option>
                            <option id="AUD" value="5">AUD</option>
                        </select>
                        <IMaskInput
                            mask={Number}
                            max={999999999999999}
                            radix="."
                            id="Input2" 
                            normalizeZeros= {true}
                            className="inputs"
                            value={valor.moeda2}
                            unmask={false}
                            onChange={(e:any) => setValor( {
                                moeda1: `${(e.target.value == 0) ? null : (e.target.value * parseFloat(cotacao))}`,
                                moeda2:`${(e.target.value == 0) ? null : e.target.value}`
                            })}
                            placeholder={`${index.placeholder}`}
                            mapToRadix={ ['.']}
                            />
                        
                    </div>
                </form>
            </div>
        </>
    )
}

export default Formulario;