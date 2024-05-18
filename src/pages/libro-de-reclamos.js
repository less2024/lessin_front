import '../styles/libro-de-reclamos.scss';

import { useState } from 'react';
import Image from 'next/image';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormLabel from '@mui/material/FormLabel';


export default function LibroReclamos() {

    const [age, setAge] = useState(0);
    const [departamento, setDepartamento] = useState(0);

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const departHandleChange = (event) => {
        setDepartamento(event.target.value);
      };


    return (
        <div className="pageCont inlineBlock">
        <section className="secBox libroPage">
            <Container maxWidth="xm">
                <div className="inlineBlock libroBox">
                    <div className="inlineBlock libroTitle">
                    <h1>Libro de Reclamaciones</h1>
                    </div>

                    <div className="inlineBlock libroForm">
                        <div className="inlineBlock libroFormItem">
                            <div className="inlineFlex title">
                                <h3>1. Identificación del consumidor reclamante</h3>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        
                                        <FormControlLabel value="other" control={<Radio />} label="Persona Natural" />
                                        <FormControlLabel value="female" control={<Radio />} label="Empresa" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className="inlineFlex libroRow libroRow3">
                                <div className="inlineBlock libroField">
                                    <TextField 
                                        id="nombres"
                                        label="Nombres"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        placeholder="Ingresa tus nombres"
                                    />
                                </div>
                                <div className="inlineBlock libroField">
                                    <TextField 
                                        id="apPat"
                                        label="Apellido Paterno"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        placeholder="Ingresa tu apellido paterno"
                                    />
                                </div>
                                <div className="inlineBlock libroField">
                                    <TextField 
                                        id="apMat"
                                        label="Apellido Materno"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        placeholder="Ingresa tu apellido materno"
                                    />
                                </div>
                            </div>

                            <div className="inlineFlex libroRow libroRow2right">
                                <div className="inlineBlock libroFieldCombine">
                                    <div className="libroField libroRowRdo">
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">Tipo de Documento</FormLabel>
                                            <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="male" control={<Radio />} label="DNI" />
                                                <FormControlLabel value="female" control={<Radio />} label="Carnet de Extranjería" />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <div className="libroField">
                                        <TextField 
                                            id="direccion"
                                            label="Número de Documento"
                                            variant="standard"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            placeholder="Ingresa el # de documento"
                                        />
                                    </div>
                                    <div className="libroField libroRowRdo">
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">.</FormLabel>
                                            <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="male" control={<Radio />} label="Soy menor de edad" />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="inlineBlock libroField">
                                    <TextField 
                                        id="direccion"
                                        label="Nombre completo del Apoderado"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        placeholder="Ingresa el nombre completo del apoderado"
                                    />
                                </div>
                            </div>

                            <div className="inlineFlex libroRow libroRow3">
                                <div className="inlineBlock libroField">
                                    <TextField 
                                        id="telefono"
                                        label="Teléfono Fijo/Celular"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        placeholder="Ingresa tu teléfono fijo/celular"
                                    />
                                </div>
                                <div className="inlineBlock libroField">
                                    <TextField 
                                        id="correo"
                                        label="Email"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        placeholder="Ingresa tu email"
                                    />
                                </div>
                                <div className="inlineBlock libroField">
                                    <TextField 
                                        id="direccion"
                                        label="Dirección"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        placeholder="Ingresa tu dirección"
                                    />
                                </div>
                            </div>
                            <div className="inlineFlex libroRow libroRow3">
                                <div className="inlineBlock libroField">
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-standard-label">País</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={age}
                                            onChange={handleChange}
                                            label="País"
                                            defaultValue={10}
                                        >
                                            <MenuItem value={0}>Selecciona tu país</MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="inlineBlock libroField">
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-standard-label">Departamento</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={departamento}
                                            onChange={departHandleChange}
                                            label="País"
                                            defaultValue={10}
                                        >
                                            <MenuItem value={0}>Selecciona tu departamento</MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="inlineBlock libroField">
                                    <TextField 
                                        id="direccion"
                                        label="Dirección"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        placeholder="Ingresa tu ciudad"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="inlineBlock libroFormItem">
                            <div className="inlineFlex title">
                                <h3>2. Identificación del bien reclamado</h3>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        
                                        <FormControlLabel value="other" control={<Radio />} label="Producto" />
                                        <FormControlLabel value="female" control={<Radio />} label="Servicio" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className="inlineFlex libroRow libroRow2Left">
                                <div className="inlineBlock libroField">
                                    <TextField 
                                        id="nombres"
                                        label="Monto reclamado (S/)"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        placeholder="Ingresa el monto"
                                    />
                                </div>
                                <div className="inlineBlock libroField libroFieldCombine">
                                    <TextField 
                                        id="apPat"
                                        label="Descripción"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        placeholder="Ingresa una breve descripción del bien"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="inlineBlock libroFormItem">
                            <div className="inlineFlex title">
                                <h3>3. Detalle de la reclamación</h3>
                            </div>
                            <div className="inlineFlex libroRow libroRow1">
                                <div className="inlineBlock libroField libroRowRdo">
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Reclamo (Disconformidad relacionada a los productos o servicios)" />
                                            <FormControlLabel value="male" control={<Radio />} label="Queja (Disconformidad no relacionada a los productos o servicios; o, malestar o descontento respecto a la atención al público)" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>

                            <div className="inlineFlex libroRow libroRow2">
                                <div className="inlineBlock libroField">
                                    <TextField 
                                        id="direccion"
                                        label="Detalle"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        placeholder="Ingresa detalle del reclamo"
                                    />
                                </div>
                                <div className="inlineBlock libroField">
                                    <TextField 
                                        id="direccion"
                                        label="Pedido"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        placeholder="Ingresa información del pedido"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="inlineBlock libroFormItem">
                            <div className="inlineFlex title">
                                <h3>4. Observaciones y acciones adoptadas por el proveedor</h3>
                            </div>

                            <div className="inlineFlex libroRow libroRow1FullWidth">
                                <div className="inlineBlock libroField">
                                    <TextField 
                                        id="direccion"
                                        label="Observaciones"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        placeholder="Ingresa detalle de observaciones del reclamo"
                                    />
                                </div>
                            </div>

                            <div className="libroNote">
                                <p>
                                    * La formulación del reclamo no impide acudir a otras vías de solución de controversias y no es requisito previo para imponer una denuncia ante el INDECOPI <br />
                                    * El proveedor deberá dar respuesta al reclamo en un plazo no mayor a treinta (30) días calendario, pudiendo ampliar el plazo hasta por treinta (30) días más, previa comunicación al consumidor. <br />
                                    NOTA: La respuesta a la presente queja o reclamo será brindada mediante comunicación electrónica enviada a la dirección que usted ha consignado en la presente Hoja de Reclamación. En caso de que usted desee que la respuesta le sea enviada a su domicilio deberá expresar ello en el detalle del reclamo o queja.
                                </p>
                            </div>
                            <div className="inlineFlex libroSnd">
                                <a >Enviar</a>
                            </div>
                        </div>

                    </div>

                    
                </div>
            </Container>
        </section>
        </div>
    )
}
  