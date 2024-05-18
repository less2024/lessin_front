import '../styles/in-course.scss';

import { useState  } from 'react';
import Image from 'next/image';

import in_course_preview from '../assets/img/in_course_preview.png';
import ico_play from '../assets/img/ico_play.png';
import in_course_ico_btn from '../assets/img/in_course_ico_btn.svg';
import detCourseTeacher from '../assets/img/detCourseTeacher.png';


export default function InCourse() {

    return (
        <div className="pageCont pageInCourse inlineBlock">
            <section className="secBox pdcDet">

                <div className="inlineBlock picBlockMenu"></div>
                <div className="inlineFlex pageInCourseCont">
                    <div className="inlineFlex picMedia">
                        <figure className="inlineBlock picVideo">
                            <Image src={in_course_preview} />
                            <div className="play">
                                <Image src={ico_play} />
                            </div>
                            <div className="note">
                                <h5>Siguiente clase</h5>
                                <p>
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 2L8 8L2 14" stroke="#5CE1E6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    2.2. Degradados y rellenos de capa
                                </p>
                                <a href="#" className="btnNext">
                                    Ver siguiente clase
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 2L8 8L2 14" stroke="#5CE1E6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </a>
                            </div>
                        </figure>

                        <div className="inlineFlex picPaginate">
                            <a href="#" className='prev'>
                                1.1. Introducción a la interfaz de Photoshop
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 1L1 5L5 9" stroke="#F50F57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </a>
                            <a href="#" className='next'>
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 1L1 5L5 9" stroke="#F50F57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                2.2. Degradados y rellenos de capa
                            </a>
                        </div>

                        <div className="inlineBlock picComments">
                            <div className="inlineBlock picCommentsBox">
                                <h4>
                                    Comentarios de estudiantes
                                </h4>
                                <div className="inlineFlex picCommentsItem">
                                    <figure>
                                        <Image src={detCourseTeacher} />
                                    </figure>
                                    <div className="txt">
                                        <h5>Diego Viegas Lopez</h5>
                                        <p>hace 2 semanas</p>
                                    </div>
                                    <div className="commend">
                                        <p>Lorem ipsum dolor sit amet consectetur. Tellus pulvinar sit tellus adipiscing congue bibendum turpis varius. Viverra nunc vitae enim risus sit egestas eu. Ultricies scelerisque purus vulputate ipsum. Facilisis in malesuada vitae pulvinar scelerisque.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="picSidebar">
                        <div className="inlineFlex picBread">
                            <div className="minBar">
                                Minimizar barra
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 1L1 5L5 9" stroke="#F50F57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="back">
                                Volver al curso
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 1L1 5L5 9" stroke="#F50F57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <div className="inlineBlock picClassList">
                            <div className="picClassItem">
                                <h3>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 11C2 12.1819 2.23279 13.3522 2.68508 14.4442C3.13738 15.5361 3.80031 16.5282 4.63604 17.364C5.47177 18.1997 6.46392 18.8626 7.55585 19.3149C8.64778 19.7672 9.8181 20 11 20C12.1819 20 13.3522 19.7672 14.4442 19.3149C15.5361 18.8626 16.5282 18.1997 17.364 17.364C18.1997 16.5282 18.8626 15.5361 19.3149 14.4442C19.7672 13.3522 20 12.1819 20 11C20 9.8181 19.7672 8.64778 19.3149 7.55585C18.8626 6.46392 18.1997 5.47177 17.364 4.63604C16.5282 3.80031 15.5361 3.13738 14.4442 2.68508C13.3522 2.23279 12.1819 2 11 2C9.8181 2 8.64778 2.23279 7.55585 2.68508C6.46392 3.13738 5.47177 3.80031 4.63604 4.63604C3.80031 5.47177 3.13738 6.46392 2.68508 7.55585C2.23279 8.64778 2 9.8181 2 11Z" stroke="#F50F57" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    1. Introducción
                                </h3>
                                <ul>
                                    <li>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 11C2 12.1819 2.23279 13.3522 2.68508 14.4442C3.13738 15.5361 3.80031 16.5282 4.63604 17.364C5.47177 18.1997 6.46392 18.8626 7.55585 19.3149C8.64778 19.7672 9.8181 20 11 20C12.1819 20 13.3522 19.7672 14.4442 19.3149C15.5361 18.8626 16.5282 18.1997 17.364 17.364C18.1997 16.5282 18.8626 15.5361 19.3149 14.4442C19.7672 13.3522 20 12.1819 20 11C20 9.8181 19.7672 8.64778 19.3149 7.55585C18.8626 6.46392 18.1997 5.47177 17.364 4.63604C16.5282 3.80031 15.5361 3.13738 14.4442 2.68508C13.3522 2.23279 12.1819 2 11 2C9.8181 2 8.64778 2.23279 7.55585 2.68508C6.46392 3.13738 5.47177 3.80031 4.63604 4.63604C3.80031 5.47177 3.13738 6.46392 2.68508 7.55585C2.23279 8.64778 2 9.8181 2 11Z" stroke="#F50F57" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <a href="#">Introducción a la interfaz de Photoshop</a>
                                    </li>
                                </ul>

                            </div>
                            <div className="picClassItem">
                                <h3>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 11C2 12.1819 2.23279 13.3522 2.68508 14.4442C3.13738 15.5361 3.80031 16.5282 4.63604 17.364C5.47177 18.1997 6.46392 18.8626 7.55585 19.3149C8.64778 19.7672 9.8181 20 11 20C12.1819 20 13.3522 19.7672 14.4442 19.3149C15.5361 18.8626 16.5282 18.1997 17.364 17.364C18.1997 16.5282 18.8626 15.5361 19.3149 14.4442C19.7672 13.3522 20 12.1819 20 11C20 9.8181 19.7672 8.64778 19.3149 7.55585C18.8626 6.46392 18.1997 5.47177 17.364 4.63604C16.5282 3.80031 15.5361 3.13738 14.4442 2.68508C13.3522 2.23279 12.1819 2 11 2C9.8181 2 8.64778 2.23279 7.55585 2.68508C6.46392 3.13738 5.47177 3.80031 4.63604 4.63604C3.80031 5.47177 3.13738 6.46392 2.68508 7.55585C2.23279 8.64778 2 9.8181 2 11Z" stroke="#F50F57" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    2. Empecemos!
                                </h3>
                                <ul>
                                    <li>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 11C2 12.1819 2.23279 13.3522 2.68508 14.4442C3.13738 15.5361 3.80031 16.5282 4.63604 17.364C5.47177 18.1997 6.46392 18.8626 7.55585 19.3149C8.64778 19.7672 9.8181 20 11 20C12.1819 20 13.3522 19.7672 14.4442 19.3149C15.5361 18.8626 16.5282 18.1997 17.364 17.364C18.1997 16.5282 18.8626 15.5361 19.3149 14.4442C19.7672 13.3522 20 12.1819 20 11C20 9.8181 19.7672 8.64778 19.3149 7.55585C18.8626 6.46392 18.1997 5.47177 17.364 4.63604C16.5282 3.80031 15.5361 3.13738 14.4442 2.68508C13.3522 2.23279 12.1819 2 11 2C9.8181 2 8.64778 2.23279 7.55585 2.68508C6.46392 3.13738 5.47177 3.80031 4.63604 4.63604C3.80031 5.47177 3.13738 6.46392 2.68508 7.55585C2.23279 8.64778 2 9.8181 2 11Z" stroke="#F50F57" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <a href="#">Capas y Opacidad</a>
                                    </li>
                                    <li>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 11C2 12.1819 2.23279 13.3522 2.68508 14.4442C3.13738 15.5361 3.80031 16.5282 4.63604 17.364C5.47177 18.1997 6.46392 18.8626 7.55585 19.3149C8.64778 19.7672 9.8181 20 11 20C12.1819 20 13.3522 19.7672 14.4442 19.3149C15.5361 18.8626 16.5282 18.1997 17.364 17.364C18.1997 16.5282 18.8626 15.5361 19.3149 14.4442C19.7672 13.3522 20 12.1819 20 11C20 9.8181 19.7672 8.64778 19.3149 7.55585C18.8626 6.46392 18.1997 5.47177 17.364 4.63604C16.5282 3.80031 15.5361 3.13738 14.4442 2.68508C13.3522 2.23279 12.1819 2 11 2C9.8181 2 8.64778 2.23279 7.55585 2.68508C6.46392 3.13738 5.47177 3.80031 4.63604 4.63604C3.80031 5.47177 3.13738 6.46392 2.68508 7.55585C2.23279 8.64778 2 9.8181 2 11Z" stroke="#F50F57" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <a href="#">Degradados y rellenos de capa</a>
                                    </li>
                                    <li>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 11C2 12.1819 2.23279 13.3522 2.68508 14.4442C3.13738 15.5361 3.80031 16.5282 4.63604 17.364C5.47177 18.1997 6.46392 18.8626 7.55585 19.3149C8.64778 19.7672 9.8181 20 11 20C12.1819 20 13.3522 19.7672 14.4442 19.3149C15.5361 18.8626 16.5282 18.1997 17.364 17.364C18.1997 16.5282 18.8626 15.5361 19.3149 14.4442C19.7672 13.3522 20 12.1819 20 11C20 9.8181 19.7672 8.64778 19.3149 7.55585C18.8626 6.46392 18.1997 5.47177 17.364 4.63604C16.5282 3.80031 15.5361 3.13738 14.4442 2.68508C13.3522 2.23279 12.1819 2 11 2C9.8181 2 8.64778 2.23279 7.55585 2.68508C6.46392 3.13738 5.47177 3.80031 4.63604 4.63604C3.80031 5.47177 3.13738 6.46392 2.68508 7.55585C2.23279 8.64778 2 9.8181 2 11Z" stroke="#F50F57" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <a href="#">Creación de Textos</a>
                                    </li>
                                    <li>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 11C2 12.1819 2.23279 13.3522 2.68508 14.4442C3.13738 15.5361 3.80031 16.5282 4.63604 17.364C5.47177 18.1997 6.46392 18.8626 7.55585 19.3149C8.64778 19.7672 9.8181 20 11 20C12.1819 20 13.3522 19.7672 14.4442 19.3149C15.5361 18.8626 16.5282 18.1997 17.364 17.364C18.1997 16.5282 18.8626 15.5361 19.3149 14.4442C19.7672 13.3522 20 12.1819 20 11C20 9.8181 19.7672 8.64778 19.3149 7.55585C18.8626 6.46392 18.1997 5.47177 17.364 4.63604C16.5282 3.80031 15.5361 3.13738 14.4442 2.68508C13.3522 2.23279 12.1819 2 11 2C9.8181 2 8.64778 2.23279 7.55585 2.68508C6.46392 3.13738 5.47177 3.80031 4.63604 4.63604C3.80031 5.47177 3.13738 6.46392 2.68508 7.55585C2.23279 8.64778 2 9.8181 2 11Z" stroke="#F50F57" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <a href="#">Estilos de capas</a>
                                    </li>
                                    <li>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 11C2 12.1819 2.23279 13.3522 2.68508 14.4442C3.13738 15.5361 3.80031 16.5282 4.63604 17.364C5.47177 18.1997 6.46392 18.8626 7.55585 19.3149C8.64778 19.7672 9.8181 20 11 20C12.1819 20 13.3522 19.7672 14.4442 19.3149C15.5361 18.8626 16.5282 18.1997 17.364 17.364C18.1997 16.5282 18.8626 15.5361 19.3149 14.4442C19.7672 13.3522 20 12.1819 20 11C20 9.8181 19.7672 8.64778 19.3149 7.55585C18.8626 6.46392 18.1997 5.47177 17.364 4.63604C16.5282 3.80031 15.5361 3.13738 14.4442 2.68508C13.3522 2.23279 12.1819 2 11 2C9.8181 2 8.64778 2.23279 7.55585 2.68508C6.46392 3.13738 5.47177 3.80031 4.63604 4.63604C3.80031 5.47177 3.13738 6.46392 2.68508 7.55585C2.23279 8.64778 2 9.8181 2 11Z" stroke="#F50F57" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <a href="#">Ejercicio 1 - Diseñamos tu primer Flyer!</a>
                                    </li>
                                </ul>
                            </div>
                            {false &&
                            <div className="picClassItemDet">
                                <h4>Adobe Photoshop: Básico</h4>
                                <h2>2.1. Capas y Opacidad</h2>
                                <a href="#" className="btnSolid btnDownload">
                                    Descargar material
                                    <Image src={in_course_ico_btn} />
                                </a>
                                <div className="banner">

                                </div>
                            </div>
                            }
                        </div>

                        <div className="inlineFlex picProgress">
                            <div className="picProgressLbl">
                                Progreso
                            </div>
                            <div className="picProgressLbl">
                                24% completado
                            </div>
                            <div className="inlineFlex lineBox">
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div className="inlineBlock picRespComment">
                        <div className="inlineBlock picComments">
                            <div className="inlineBlock picCommentsBox">
                                <h4>
                                    Comentarios de estudiantes
                                </h4>
                                <div className="inlineFlex picCommentsItem">
                                    <figure>
                                        <Image src={detCourseTeacher} />
                                    </figure>
                                    <div className="txt">
                                        <h5>Diego Viegas Lopez</h5>
                                        <p>hace 2 semanas</p>
                                    </div>
                                    <div className="commend">
                                        <p>Lorem ipsum dolor sit amet consectetur. Tellus pulvinar sit tellus adipiscing congue bibendum turpis varius. Viverra nunc vitae enim risus sit egestas eu. Ultricies scelerisque purus vulputate ipsum. Facilisis in malesuada vitae pulvinar scelerisque.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}
  