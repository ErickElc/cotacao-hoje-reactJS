import  { useEffect, useState } from "react";
import http from "../../api/api";
import { ICotacao } from "../../interface/interface";
import "./form.scss";
const Moedas = ["USD", "EUR", "CAD", "GBP", "RUB", "AUD","ARS"];
const route = 'USD-BRL,EUR-BRL,AUD-BRL,RUB-BRL,CAD-BRL,GBP-BRL,ARS-BRL';
function Formulario(){
    // ESTADOS
    const [index, setIndex] = useState({ i: '0', placeholder: Moedas[0] });
    const [cotacao, setCotacao] = useState<ICotacao | any[]>([]);
    const [valor, setValor] = useState({moeda1: '', moeda2: ""});
    const [background, setBackground] = useState({flag: Moedas[0]});
    // Api
    useEffect(()=>{
        http.get(route).then(res => {
            const data = [
                res.data.USDBRL.ask,res.data.EURBRL.ask, res.data.CADBRL.ask, 
                res.data.GBPBRL.ask,res.data.RUBBRL.ask,res.data.AUDBRL.ask,
                res.data.ARSBRL.ask
            ];
            setCotacao(data);
        }).catch(err => console.log(err));
    },[]);
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
            <select 
                value={index.i} 
                onChange={(e) => {
                    selecionarMoeda(e); 
                }}  className="Selection"
            >
                {Moedas.map((item, index) =>
                    <option id={item} value={index} key={index}>{item}</option>
                )}
            </select>
            <div className="Form">
                <form className="ContainerForm">
                    <div className="containerInput1">
                        <p className="moeda">BRL:</p>
                        <input 
                            type="number"
                            max={999999999999999}
                            id="Input1" 
                            className="inputs"
                            value={valor.moeda1}
                            onChange={(e: {target: HTMLInputElement}) => setValor({
                                moeda1: `${(e.target.value !== '0') ? parseFloat(e.target.value) : ''}`,
                                moeda2:`${(e.target.value !== '0') ? (parseFloat(e.target.value) / parseFloat(cotacao[Number(index.i)])).toFixed(2) : ''}`
                            })}
                            placeholder={"BRL"}
                        />
            
                    </div>
                    <div className="containerInput1">
                        <p className="moeda">{index.placeholder}:</p>
                        <input 
                            type="number"
                            max={999999999999999}
                            onChange={(e: {target: HTMLInputElement}) => setValor( {
                                moeda1: `${(e.target.value !== '0') ? (parseFloat(e.target.value) * parseFloat(cotacao[Number(index.i)])).toFixed(2): ''}`,
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