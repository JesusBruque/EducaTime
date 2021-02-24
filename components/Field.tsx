import homeStyles from "../styles/Home.module.css";
import React from "react";

const Field = () => {

    return (
        <svg id={'main_field'} className={homeStyles.mainField} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 792.07 528.8" stroke={'var(--main-color)'}>
            <rect x="3.84" y="3.84" width="784.39" height="521.11" fill="none" strokeWidth="7.69" className={'field_border'} strokeDashoffset={2800} strokeDasharray={2800}/>
            <rect x="3.84" y="119.61" width="122.41" height="293.65" fill="none" strokeWidth="7.69"  className={'field_element'} strokeDashoffset={1000} strokeDasharray={1000}/>
            <rect x="3.84" y="200.11" width="42.66" height="132.66" fill="none" strokeWidth="7.69"  className={'field_element'} strokeDashoffset={1000} strokeDasharray={1000}/>
            <path d="M150.9,252.13c18.4,0,33.31,24.4,33.31,54.49s-14.91,54.5-33.31,54.5"
                  transform="translate(-24.91 -40.19)" fill="none" strokeWidth="7.69"  className={'field_element'} strokeDashoffset={1000} strokeDasharray={1000}/>
            <circle cx="87.7" cy="266.44" r="4.08"  className={'field_circle'} fill={'none'} strokeDashoffset={1000} strokeDasharray={1000}/>
            <circle cx="396.6" cy="266.48" r="68.56" fill="none" strokeMiterlimit="10"
                    strokeWidth="7.69"  className={'field_element'} strokeDashoffset={1000} strokeDasharray={1000}/>
            <line x1="396.6" y1="3.84" x2="396.6" y2="524.96" fill="none" strokeMiterlimit="10"
                  strokeWidth="7.69"  className={'field_element'} strokeDashoffset={1000} strokeDasharray={1000}/>
            <rect x="690.73" y="159.8" width="122.41" height="293.65" transform="translate(1478.96 573.06) rotate(180)"
                  fill="none" strokeWidth="7.69"  className={'field_element'} strokeDashoffset={1000} strokeDasharray={1000}/>
            <rect x="770.48" y="240.29" width="42.66" height="132.66" transform="translate(1558.71 573.06) rotate(180)"
                  fill="none" strokeWidth="7.69"  className={'field_element'} strokeDashoffset={1000} strokeDasharray={1000}/>
            <path d="M691,361.12c-18.4,0-33.31-24.4-33.31-54.5s14.91-54.49,33.31-54.49"
                  transform="translate(-24.91 -40.19)" fill="none" strokeWidth="7.69"  className={'field_element'} strokeDashoffset={1000} strokeDasharray={1000}/>
            <circle cx="704.38" cy="266.44" r="4.08"  className={'field_circle'} fill={'none'} strokeDashoffset={1000} strokeDasharray={1000}/>

            <g transform="translate(-3500.438 965.642) rotate(-20)">
                <path className={'element_bb circle'}  style={{opacity:0}}  strokeDashoffset={1000} strokeDasharray={1000} d="M3791.067,476.04c.067,1.056.069,1.045-1.831.95-.14-.007-.331.31-.652.629a21.782,21.782,0,0,1-10.733-.112c-4.321-1.211-7.451-3.069-8.942-5.757-2.013-3.629.133-6.642,4.71-9.025,3.914-2.038,8.9-2.575,14.191-1.771a19.743,19.743,0,0,1,6.212,1.878,5.84,5.84,0,0,1,2.416,2.737c.057.1-.244.372-.354.368a3.711,3.711,0,0,1-1.261-.192c-1.065-.51-2.025-1.09-3.079-1.608a15.462,15.462,0,0,0-6.352-1.844,16.941,16.941,0,0,0-3.367.1c-2.763.448-5.76.685-7.68,2.111-.628.467-1.154.978-1.727,1.468a5.137,5.137,0,0,1-1.364,1.1c-.64.266-.534.453-.4.8a2.038,2.038,0,0,1,.188,1.419c-.67,1.82.594,3.307,2.478,4.651a32.23,32.23,0,0,0,3.179,1.6,9.139,9.139,0,0,0,3.594.841,15.729,15.729,0,0,0,3.674.322c1.139-.149,2.308-.221,3.464-.328Z" fill="#565656"/>
                <path className={'element_bb circle'}  style={{opacity:0}} strokeDashoffset={1000} strokeDasharray={1000} d="M3811.711,497.423l-1.764-.282c4.025-3.2,3.458-7.68,4.288-12.074a7.774,7.774,0,0,1,1.018,1.964,10.018,10.018,0,0,1-1.219,6.48C3813.343,494.8,3812.543,496.03,3811.711,497.423Z" transform="translate(-17.832 -21.637)" fill="#565656"/>
            </g>
            <g transform="translate(-3450.438 1065.642) rotate(-20)">
                <path className={'element_bb circle'}  style={{opacity:0}} strokeDashoffset={1000} strokeDasharray={1000} d="M3791.067,476.04c.067,1.056.069,1.045-1.831.95-.14-.007-.331.31-.652.629a21.782,21.782,0,0,1-10.733-.112c-4.321-1.211-7.451-3.069-8.942-5.757-2.013-3.629.133-6.642,4.71-9.025,3.914-2.038,8.9-2.575,14.191-1.771a19.743,19.743,0,0,1,6.212,1.878,5.84,5.84,0,0,1,2.416,2.737c.057.1-.244.372-.354.368a3.711,3.711,0,0,1-1.261-.192c-1.065-.51-2.025-1.09-3.079-1.608a15.462,15.462,0,0,0-6.352-1.844,16.941,16.941,0,0,0-3.367.1c-2.763.448-5.76.685-7.68,2.111-.628.467-1.154.978-1.727,1.468a5.137,5.137,0,0,1-1.364,1.1c-.64.266-.534.453-.4.8a2.038,2.038,0,0,1,.188,1.419c-.67,1.82.594,3.307,2.478,4.651a32.23,32.23,0,0,0,3.179,1.6,9.139,9.139,0,0,0,3.594.841,15.729,15.729,0,0,0,3.674.322c1.139-.149,2.308-.221,3.464-.328Z" fill="#565656"/>
                <path className={'element_bb circle'}  style={{opacity:0}} strokeDashoffset={1000} strokeDasharray={1000} d="M3811.711,497.423l-1.764-.282c4.025-3.2,3.458-7.68,4.288-12.074a7.774,7.774,0,0,1,1.018,1.964,10.018,10.018,0,0,1-1.219,6.48C3813.343,494.8,3812.543,496.03,3811.711,497.423Z" transform="translate(-17.832 -21.637)" fill="#565656"/>
            </g>
            <g transform="translate(-3500.438 1165.642) rotate(-20)">
                <path className={'element_bb circle'} style={{opacity:0}} strokeDashoffset={1000} strokeDasharray={1000} d="M3791.067,476.04c.067,1.056.069,1.045-1.831.95-.14-.007-.331.31-.652.629a21.782,21.782,0,0,1-10.733-.112c-4.321-1.211-7.451-3.069-8.942-5.757-2.013-3.629.133-6.642,4.71-9.025,3.914-2.038,8.9-2.575,14.191-1.771a19.743,19.743,0,0,1,6.212,1.878,5.84,5.84,0,0,1,2.416,2.737c.057.1-.244.372-.354.368a3.711,3.711,0,0,1-1.261-.192c-1.065-.51-2.025-1.09-3.079-1.608a15.462,15.462,0,0,0-6.352-1.844,16.941,16.941,0,0,0-3.367.1c-2.763.448-5.76.685-7.68,2.111-.628.467-1.154.978-1.727,1.468a5.137,5.137,0,0,1-1.364,1.1c-.64.266-.534.453-.4.8a2.038,2.038,0,0,1,.188,1.419c-.67,1.82.594,3.307,2.478,4.651a32.23,32.23,0,0,0,3.179,1.6,9.139,9.139,0,0,0,3.594.841,15.729,15.729,0,0,0,3.674.322c1.139-.149,2.308-.221,3.464-.328Z" fill="#565656"/>
                <path className={'element_bb circle'} style={{opacity:0}} strokeDashoffset={1000} strokeDasharray={1000} d="M3811.711,497.423l-1.764-.282c4.025-3.2,3.458-7.68,4.288-12.074a7.774,7.774,0,0,1,1.018,1.964,10.018,10.018,0,0,1-1.219,6.48C3813.343,494.8,3812.543,496.03,3811.711,497.423Z" transform="translate(-17.832 -21.637)" fill="#565656"/>
            </g>

            <path className={'element_bb equis'}  d="M3690.7,428.48c-.31.91-.583.9-.95.137-1.5-3.121-2.962-6.292-4.549-9.277a41.035,41.035,0,0,0-2.94-4.244c-1.113,2.285-2.287,4.369-3.229,6.722-.956,2.387-2.352,3.952-3.478,6.007-.234.429-.864.406-1.286.3-.246-.061-.493-.657-.626-1.109-.038-.127.331-.581.5-.908.817-1.615,1.636-3.225,2.437-4.861.366-.747.668-1.583,1.042-2.317.906-1.781,1.809-3.57,2.766-5.268.743-1.318.781-1.587-.076-2.761a66.03,66.03,0,0,1-6.064-10.7,5.508,5.508,0,0,1-.154-1.434c.319-.048.721-.33.944-.1a19.081,19.081,0,0,1,4.094,6.755,8.789,8.789,0,0,0,2.46,4.051c1.2.9,1.229.893,2.237-.759,1.934-3.164,3.93-6.217,5.9-9.311.387-.607.81-.951,1.344-.489a2.283,2.283,0,0,1,.415,2.567,3.71,3.71,0,0,1-.659,1.042,45.147,45.147,0,0,0-5.463,8.21c-.617,1.084-1.353,1.974-2.057,2.985.95,1.4,1.832,2.671,2.693,3.984a6.084,6.084,0,0,1,.41,1.029c.1.262.186.723.309.753,1,.254,1.507,1.768,1.746,2.882a12.317,12.317,0,0,0,1.625,4.581A8.151,8.151,0,0,1,3690.7,428.48Z" transform="matrix(0.208, -0.978, 0.978, 0.208, -653.658, 3628.152)" fill="#565656" stroke="none"   style={{opacity:0}}/>
            <path className={'element_bb equis'} d="M3690.7,428.48c-.31.91-.583.9-.95.137-1.5-3.121-2.962-6.292-4.549-9.277a41.035,41.035,0,0,0-2.94-4.244c-1.113,2.285-2.287,4.369-3.229,6.722-.956,2.387-2.352,3.952-3.478,6.007-.234.429-.864.406-1.286.3-.246-.061-.493-.657-.626-1.109-.038-.127.331-.581.5-.908.817-1.615,1.636-3.225,2.437-4.861.366-.747.668-1.583,1.042-2.317.906-1.781,1.809-3.57,2.766-5.268.743-1.318.781-1.587-.076-2.761a66.03,66.03,0,0,1-6.064-10.7,5.508,5.508,0,0,1-.154-1.434c.319-.048.721-.33.944-.1a19.081,19.081,0,0,1,4.094,6.755,8.789,8.789,0,0,0,2.46,4.051c1.2.9,1.229.893,2.237-.759,1.934-3.164,3.93-6.217,5.9-9.311.387-.607.81-.951,1.344-.489a2.283,2.283,0,0,1,.415,2.567,3.71,3.71,0,0,1-.659,1.042,45.147,45.147,0,0,0-5.463,8.21c-.617,1.084-1.353,1.974-2.057,2.985.95,1.4,1.832,2.671,2.693,3.984a6.084,6.084,0,0,1,.41,1.029c.1.262.186.723.309.753,1,.254,1.507,1.768,1.746,2.882a12.317,12.317,0,0,0,1.625,4.581A8.151,8.151,0,0,1,3690.7,428.48Z" transform="matrix(0.208, -0.978, 0.978, 0.208, -553.658, 3728.152)" fill="#565656" stroke="none"  style={{opacity:0}}/>
            <path className={'element_bb equis'} d="M3690.7,428.48c-.31.91-.583.9-.95.137-1.5-3.121-2.962-6.292-4.549-9.277a41.035,41.035,0,0,0-2.94-4.244c-1.113,2.285-2.287,4.369-3.229,6.722-.956,2.387-2.352,3.952-3.478,6.007-.234.429-.864.406-1.286.3-.246-.061-.493-.657-.626-1.109-.038-.127.331-.581.5-.908.817-1.615,1.636-3.225,2.437-4.861.366-.747.668-1.583,1.042-2.317.906-1.781,1.809-3.57,2.766-5.268.743-1.318.781-1.587-.076-2.761a66.03,66.03,0,0,1-6.064-10.7,5.508,5.508,0,0,1-.154-1.434c.319-.048.721-.33.944-.1a19.081,19.081,0,0,1,4.094,6.755,8.789,8.789,0,0,0,2.46,4.051c1.2.9,1.229.893,2.237-.759,1.934-3.164,3.93-6.217,5.9-9.311.387-.607.81-.951,1.344-.489a2.283,2.283,0,0,1,.415,2.567,3.71,3.71,0,0,1-.659,1.042,45.147,45.147,0,0,0-5.463,8.21c-.617,1.084-1.353,1.974-2.057,2.985.95,1.4,1.832,2.671,2.693,3.984a6.084,6.084,0,0,1,.41,1.029c.1.262.186.723.309.753,1,.254,1.507,1.768,1.746,2.882a12.317,12.317,0,0,0,1.625,4.581A8.151,8.151,0,0,1,3690.7,428.48Z" transform="matrix(0.208, -0.978, 0.978, 0.208, -633.658, 3828.152)" fill="#565656" stroke="none"  style={{opacity:0}}/>

            <g transform="translate(1030.762 3980.872) rotate(-110)" className={'element_bb line-1'}>
                <path d="M3940.929,789.769c-1.863-1.115-3.735-2.214-5.577-3.362-.252-.157-.354-.555-.525-.841.314-.112.651-.359.94-.312a7.8,7.8,0,0,1,3.97,1.9,6.713,6.713,0,0,0,3.171,1.977c.672.126,1.117,1.6,1.006,2.267-.3,1.771-1.654,2.509-2.968,3.353-.575.369-1,.971-1.574,1.342a3.421,3.421,0,0,1-1.242.252c-.187.032-.422-.019-.558.078-.609.431-1.189.9-1.764,1.345-.692-.406-.616-.679-.075-1.01,1.75-1.073,3.5-2.155,5.218-3.275a7.984,7.984,0,0,0,1.126-1.161c-.446-.02-.693-.026-.938-.043-1.533-.1-3.066-.2-4.6-.319a16.113,16.113,0,0,1-2.193-.254,5.392,5.392,0,0,1-1.225-.636c.95-.39,1.681-.7,2.418-.987a.914.914,0,0,1,.394-.046c1.3.1,2.593.223,3.892.286a4.293,4.293,0,0,0,1.085-.231Q3940.92,789.932,3940.929,789.769Z" transform="translate(-194.337)" fill="#565656" stroke="none"   style={{opacity:0}}/>
                <path d="M3730.171,800.067a6.736,6.736,0,0,0,1.5.372,14.145,14.145,0,0,0,2.373-.178c1.489-.2,2.316.311,2.262,1.447-.022.475-.229.66-.708.617-.547-.048-1.1-.044-1.649-.067-.891-.036-1.781-.1-2.672-.1-.707,0-1.414.1-2.122.119a11.833,11.833,0,0,1-2.036-.054,1.153,1.153,0,0,1-.711-.635c-.3-.705-.02-1.006.743-1.078C3728.127,800.414,3729.092,800.229,3730.171,800.067Z" transform="translate(-53.682 -10.078)" fill="#565656" stroke="none"   style={{opacity:0}}/>
                <path d="M3861.386,801.89c-.13.085-.375.372-.644.4a13.1,13.1,0,0,1-1.881-.028c-1.181-.059-2.361-.165-3.542-.188a4.766,4.766,0,0,0-1.555.226c-1.278.421-2.485-.207-2.34-1.291a.654.654,0,0,1,.385-.46c.9-.176,1.813-.327,2.728-.422a3.162,3.162,0,0,1,1.457.075,5.169,5.169,0,0,0,2.82.151,6.27,6.27,0,0,1,1.42-.047C3861.008,800.37,3861.4,800.85,3861.386,801.89Z" transform="translate(-138.77 -10.085)" fill="#565656" stroke="none"   style={{opacity:0}}/>
                <path d="M3810.062,801.348c.907-.339,1.532-.577,2.161-.8a1.285,1.285,0,0,1,.458-.106c1.231.039,2.462.139,3.691.124a17.166,17.166,0,0,0,2.185-.3c.661-.095,1.228.171,1.156.831a1.922,1.922,0,0,1-.919,1.2,2.838,2.838,0,0,1-1.48.207c-2.057-.094-4.116-.2-6.167-.387C3810.788,802.078,3810.465,801.643,3810.062,801.348Z" transform="translate(-110.65 -10.199)" fill="#565656" stroke="none"   style={{opacity:0}}/>
                <path d="M3685.461,801.683c.166-.654.709-.792,1.346-.843,2.3-.184,4.588-.4,6.884-.569a1.279,1.279,0,0,1,.809.221c.375.288.732.655.54,1.215a.971.971,0,0,1-1.132.668c-.521-.047-1.04-.115-1.562-.136a8.247,8.247,0,0,0-1.185.049c-.418.043-.829.153-1.246.188-.615.051-1.233.066-1.85.088a1.258,1.258,0,0,1-.472-.045C3686.894,802.257,3686.2,801.976,3685.461,801.683Z" transform="translate(-25.915 -10.214)" fill="#565656" stroke="none"   style={{opacity:0}}/>
                <path d="M3769.637,801.663c.33-.13.659-.262.991-.388a3.1,3.1,0,0,1,.893-.313,23.559,23.559,0,0,1,5.6.021,1.022,1.022,0,0,1,.957,1.147c-.016.56-.336.76-.848.64a11.971,11.971,0,0,0-5.618-.314,3.725,3.725,0,0,1-.974-.114,5.673,5.673,0,0,0-.923.028c-.206.022-.446.2-.6.131a3.051,3.051,0,0,1-.676-.539,3.594,3.594,0,0,1,.6-.372,1.869,1.869,0,0,1,.553-.042Z" transform="translate(-82.344 -10.572)" fill="#565656" stroke="none"   style={{opacity:0}}/>
                <path d="M3892.713,801.26c1.574-.437,2.939.372,4.452-.036a17.792,17.792,0,0,1,4.414-.2c.38,0,.892-.08.979.561a.808.808,0,0,1-.734.969,12.362,12.362,0,0,1-1.8,0c-.4,0-.794.041-1.19.082-.172.018-.418.179-.5.114-1-.827-2.011.014-3.011-.04-.483-.026-.937.068-1.262-.45-.1-.153-.454-.162-.7-.2C3892.819,801.989,3892.56,801.743,3892.713,801.26Z" transform="translate(-166.827 -10.704)" fill="#565656" stroke="none"   style={{opacity:0}}/>
                <path d="M3654.026,802.824a4.426,4.426,0,0,0-.812-.187,7.8,7.8,0,0,0-1.054.06c-.317.018-.747.164-.93.013-.423-.347-.779-.191-1.216-.132a13.271,13.271,0,0,1-2.239.074c-.147-.005-.282-.325-.422-.5.177-.113.346-.307.533-.326q3.357-.344,6.72-.637c.507-.044,1.157-.207,1.2.609.045.8-.615.877-1.189,1A5.106,5.106,0,0,1,3654.026,802.824Z" transform="translate(0 -10.812)" fill="#565656" stroke="none"   style={{opacity:0}}/>
            </g>

            <g transform="translate(-2040.665 -2280.914) rotate(42)" className={'element_bb line-2'}>
                <path d="M3447.246,487.467l-2.732,2.349c-.132-1.069-.619-1.388-1.6-1.464a18.576,18.576,0,0,1-3.617-.859,29.464,29.464,0,0,1-2.856-.994,3.807,3.807,0,0,1-1.462-.854c-1.526-1.76-2.979-3.585-4.447-5.395-.053-.065.009-.223.04-.655,4.537,5.152,9.976,8,16.677,7.872" transform="translate(0 -44.912)" fill="#565656" stroke="none"  style={{opacity:0}}/>
                <path d="M3528.943,394.79c-.6.2-.891.293-1.177.4-1.362.513-2.741.986-4.076,1.561-1.281.552-2.521,1.2-3.769,1.83-1.319.665-2.609,1.39-3.943,2.024a1.748,1.748,0,0,1-2.234-1.314c-.3-.991.366-1.223,1.115-1.553,1.648-.727,3.218-1.627,4.855-2.378,1.485-.681,3.033-1.221,4.52-1.895a13.257,13.257,0,0,0,3.108-1.682c1.234-1.038,2.711-.942,4.088-1.187,1.2-.214,2.541,1.605,2.5,2.854-.033,1.054.195,2.115.268,3.174.156,2.285.278,4.572.436,6.856a3.213,3.213,0,0,0,.251,1.071,9.5,9.5,0,0,1,.644,4.9,1.579,1.579,0,0,1-1.909,1.566,1.276,1.276,0,0,1-.777-.816c-.422-1.741-.811-3.5-1.1-5.262a8.575,8.575,0,0,1-.111-3,10.713,10.713,0,0,0-.518-4.884l-.406-.152c-.585.977-1.115,1.994-1.767,2.924q-2.65,3.777-5.391,7.49c-1.09,1.485-2.2,2.961-3.377,4.376-.969,1.163-1.857,2.713-3.131,3.226-1.967.794-2.519,2.68-3.929,3.854-3.175,2.642-5.393,6.271-8.9,8.621-1.679,1.125-2.93,2.97-4.691,3.873-2.463,1.262-4.018,3.617-6.451,4.794-1.22.59-2.644.774-3.831,1.411-1.629.873-3.756.328-5.1,1.9a5.219,5.219,0,0,1-.818.725c-.735.562-1.427,1.111-2.5.675a2.554,2.554,0,0,0-1.547.267,15.716,15.716,0,0,0-1.861.881c-.523.272-1.022.589-1.54.87a3.053,3.053,0,0,1-1.136.532c-1.353.056-2.71,0-4.065,0a1.032,1.032,0,0,0-.67.2c-.833.84-1.607.239-2.374-.084a.7.7,0,0,1-.32-.579c.022-.188.29-.5.438-.5,2.3.095,4.247-1.47,6.686-1.211,1.436.153,3.04-.806,4.5-1.427q4.145-1.766,8.2-3.738c1.564-.766,3.022-1.745,4.534-2.618.947-.546,1.9-1.087,2.859-1.606,3.216-1.738,5.829-4.287,8.489-6.691,4.6-4.155,8.836-8.7,13.348-12.957,1.906-1.8,3.222-4.005,4.876-5.968,1.106-1.312,2.327-2.528,3.42-3.85a19.389,19.389,0,0,0,1.518-2.347c.724-1.189,1.44-2.384,2.128-3.594A15.283,15.283,0,0,0,3528.943,394.79Z" transform="translate(-18.564)" fill="#565656" stroke="none"  style={{opacity:0}}/>
            </g>

        </svg>
    )
};
export default Field;