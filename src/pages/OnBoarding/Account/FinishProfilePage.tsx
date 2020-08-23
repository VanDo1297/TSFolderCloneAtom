import React from 'react';
import * as H from "history";
import withApiHandler, { ErrorHandler, InjectedApiHandlerProps } from "../../../components/hocs/WithApiHandler";
import withSystemState, { InjectedSystemStateProps } from "../../../components/hocs/WithSystemState";
import Header from '../../../components/headers';
import Sliders from '../../../components/sliders';
import '../../../sass/pages/SetupAccountPage.scss'
import '../../../sass/common.scss';
import atomApiClient from "../../../api_clients/atom_client/AtomApiClient";
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Input from '../../../components/input';
import Dropzone from 'react-dropzone';
import iconCoverImage from '../../../images/cover-image.png';
import iconShield from '../../../images/shield.png';
import {ResponsesGymResponse, ResponsesGymsResponse,ResponsesGym} from '../../../api_clients/atom_client/src/api';
import {validateWebsiteUrl} from '../../../utils/utils';
import CryptoJS from 'crypto-js';
//getAtomProducts

import FinishProfileState from './State/FinishProfileState';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import _ from 'lodash';

const baseStyle = {
    width: '200px',
    height: '200px'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};
interface FinishProfilePageBaseProps {
    history: H.History;
    saveGymsUnid:(unid: string)=> void;
}

type FinisProfilePageProps = FinishProfilePageBaseProps & InjectedApiHandlerProps & InjectedSystemStateProps

const defaultState ={
    isLoading: false,
        coverImage: {
            preview: '',
            raw: ''
        },
        logoImage: {
            preview: '',
            raw: ''
        }
        , valueArea: '',
        websiteValue:'',
        isExists: false,
        unidExists :''
}

class FinishProfilePage extends React.Component<FinisProfilePageProps, FinishProfileState> {
    state = defaultState

    componentDidMount(){
        let id : string = localStorage.getItem('gymId') as string;
        if (this.props.history.location.state && !this.props.history.location.state.isAddProduct || !!id && id.length>0) {
            this.props.handleRequest(atomApiClient.gymsAPI.getGymsUserOwnsOrAdmins(this.props.systemState.token),
            (response: AxiosResponse<ResponsesGymsResponse>) => {
                let gyms = response.data.data.gyms;
                let gym = [] as ResponsesGym[];
                if(!!id && id.length> 0){
                    var bytes  = CryptoJS.AES.decrypt(id, 'atom-key');
                    var unid = bytes.toString(CryptoJS.enc.Utf8);
                    // call API get Gym 
                    this.setState({
                        isLoading: true,
                        isExists: true,
                        unidExists: unid
                    });
                    gym = _.filter(gyms, function(o) { return o.unid === unid }) 
                }else{
                    let sortGym = _.sortBy(gyms, function(o) { return o.updatedAt }).reverse()
                    if(sortGym[0]){
                        gym = [sortGym[0]]
                    }
                }
                if(gym.length > 0){
                    console.log(gym);
                    let data= gym[0]
                    this.setState({
                        coverImage: {
                            preview: data.coverImage,
                        },
                        logoImage: {
                            preview: data.logo,
                        }, 
                        valueArea: data.bio,
                        websiteValue:data.website 
                    })
                }    
            },
            undefined,
            () => {
                this.setState({
                    isLoading: false,
                });
            })
        }
    }

    handleChangeArea = (e: any) => {
        e.preventDefault()
        if (e.target.value.split(' ').length < 100) {
            this.setState({
                valueArea: e.target.value
            })
        }
    }
    handleNext = () => {
        
        if(!validateWebsiteUrl(this.state.websiteValue)){
            toast.error('Website is valid', {position: toast.POSITION.TOP_CENTER});
        }else{
            const data ={
                bio: this.state.valueArea,
                coverImage:'https://xuonggomsuviet.vn/wp-content/uploads/2019/12/y-nghia-hinh-tuong-con-meo-trong-van-hoa-dan-gian-5.jpg',
                logo:'https://xuonggomsuviet.vn/wp-content/uploads/2019/12/y-nghia-hinh-tuong-con-meo-trong-van-hoa-dan-gian-5.jpg',
                name:' ',
                virtual: true, // hard code
                website: this.state.websiteValue
            }
            this.setState({
                isLoading: true
            })
            // with gym Exists => edit gym
            let promise =  !this.state.isExists ?  atomApiClient.gymsAPI.addGym(data,this.props.systemState.token) :  atomApiClient.gymsAPI.editGym(this.state.unidExists ,data,this.props.systemState.token)
            this.props.handleRequest(
                promise,
                (response: AxiosResponse<ResponsesGymResponse>) => {
                    this.props.updateSetupScreen(this.props.systemState.setupScreen + 1)
                    this.props.saveGymsUnid(response.data.data.gym.unid)
                },
                undefined,
                () => {
                  this.setState({
                    isLoading: false,
                  });
                } 
            );
        }
       
    }
    handleChangeCoverImage = (e: any) => {
        this.setState({
            coverImage: {
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            }
        })
    }

    handleChangeBrand=(e: any)=>{
        this.setState({
        websiteValue : e.target.value 
        })
    }

    handleChangeLogo = (e: any) => {
        this.setState({
            logoImage: {
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            }
        })
    }
    renderContent = () => {
        return (
            <div className='setup-page-content-section w-100 d-flex flex-row'>
                <div className='w-50 d-flex flex-column p-5 setup-page-left mt-5'>
                    <p className='setup-page-left-title '>
                        Finish your profile
                   </p>
                    <p className='setup-page-left-sub-title mt-4'>
                        <span> Welcome! Let’s start off by adding some</span><br />
                        <span> detail to your brand. You can change these</span><br />
                        <span> items at any time.</span>
                    </p>
                </div>
                <div className='w-50 d-flex flex-column p-5 setup-page-right mt-5'>
                    <div className='setup-page-line' />
                    <div className='setup-page-item d-flex flex-row pt-5 '>
                        <Dropzone onDrop={(e: any) => {
                            try {
                                this.setState({
                                    logoImage: {
                                        preview: URL.createObjectURL(e[0]),
                                        raw: e[0]
                                    }
                                })
                            } catch (e) {
                                console.log(e);
                            }

                        }}>
                            {({ getRootProps, getInputProps }) => (
                                <section className='mr-4'>
                                    <div {...getRootProps({ baseStyle })}>
                                        <input {...getInputProps()} />
                                        <div className='setup-page-logo'>
                                            {
                                                this.state.logoImage.preview ?
                                                    <img src={this.state.logoImage.preview} width='100%' height='100%' /> :
                                                    (
                                                        <>
                                                            <div className='setup-page-rectangle d-flex flex-column justify-content-center align-items-center'>
                                                                <img src={iconShield} />
                                                                <p className='setup-page-drag-image-here'>DRAG IMAGE HERE</p>
                                                            </div>
                                                        </>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </section>
                            )}
                        </Dropzone>

                        <div className='h-100 d-flex flex-column justify-content-between'>
                            <div className="media-body">
                                <h5 className="mt-0">Add logo</h5>
                                <p className='setup-page-right-sub-title'>
                                    <span>Upload a logo that will be used to</span><br />
                                    <span>represent your company accross</span><br />
                                    <span>our patform.</span>
                                </p>
                            </div>
                            <div>
                                <span className='setup-page-right-upload-text'>Or <span className='pointer text-underline' onClick={
                                    () => {
                                        const el: HTMLElement | null = document.getElementById('upload-add-logo')
                                        if (el) {
                                            el.click()
                                        }
                                    }
                                }> Upload Here</span></span><br />
                                <span className='setup-page-right-upload-text'>Minimum size 200px x 200px</span><br />
                                <span className='setup-page-right-upload-text'>Minimum size 200px x 200px</span>
                                <input type="file" id="upload-add-logo" onChange={this.handleChangeLogo} style={{ display: 'none' }} />
                            </div>
                        </div>
                    </div>

                    <div className='setup-page-item d-flex flex-row pt-5 '>
                        <Dropzone onDrop={(e: any) => {
                            try {
                                this.setState({
                                    coverImage: {
                                        preview: URL.createObjectURL(e[0]),
                                        raw: e[0]
                                    }
                                })
                            } catch (e) {
                                console.log(e);
                            }

                        }}>
                            {({ getRootProps, getInputProps }) => (
                                <section className='mr-4'>
                                    <div {...getRootProps({ baseStyle })}>
                                        <input {...getInputProps()} />
                                        <div className='setup-page-logo'>
                                            {
                                                this.state.coverImage.preview ?
                                                    <img src={this.state.coverImage.preview} width='100%' height='100%' /> :
                                                    (
                                                        <>
                                                            <div className='setup-page-rectangle d-flex flex-column justify-content-center align-items-center'>
                                                                <img src={iconCoverImage} />
                                                                <p className='setup-page-drag-image-here text-center'>DRAG IMAGE HERE</p>
                                                            </div>
                                                        </>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        <div className='h-100 d-flex flex-column justify-content-between '>
                            <div className="media-body">
                                <h5 className="mt-0">Add Cover Image</h5>
                                <p className='setup-page-right-sub-title'>
                                    <span>Upload an image that can be used</span><br />
                                    <span>to represent your brand via</span><br />
                                    <span>backgrounds and other secondary</span><br />
                                    <span>placements.</span>
                                </p>
                            </div>
                            <div >
                                <span className='setup-page-right-upload-text'>Or <span className='pointer text-underline' onClick={
                                    () => {
                                        const el: HTMLElement | null = document.getElementById('upload-cover-image')
                                        if (el) {
                                            el.click()
                                        }
                                    }
                                }> Upload Here</span></span><br />
                                <span className='setup-page-right-upload-text'>Minimum size 200px x 200px</span><br />
                                <span className='setup-page-right-upload-text'>Minimum size 200px x 200px</span>
                                <input type="file" id="upload-cover-image" onChange={this.handleChangeCoverImage} style={{ display: 'none' }} />
                            </div>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <p className='setup-page-right-title'>Add Mission Statement / Bio</p>
                        <span className='setup-page-right-sub-title'>Please use up to 100 words to offer a brief description of your</span><br />
                        <span className='setup-page-right-sub-title'>  business that will appear in your profile page:</span>
                        <FormControl onChange={this.handleChangeArea} value={this.state.valueArea} className='mt-2' as="textarea" rows="8" />
                    </div>
                    <div className='mt-5 w-70'>
                        <p className='setup-page-right-title'>Brand</p>
                        <Input value={this.state.websiteValue} onChange={(e: any) =>this.handleChangeBrand(e)} name='website' placeholder='website' />
                        <Input placeholder='something else' />
                        <Input placeholder='something else' />
                    </div>
                </div>
            </div >
        )
    }
    renderFooter = () => {
        return (
            <div className='setup-page-footer d-flex justify-content-center align-items-center'>
                <div onClick={this.handleNext} className='ml-auto setup-button'>
                    <Button className='setup-button-next'>Next</Button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <>
                <Header color='#F3EFEB' ></Header>
                <Sliders history={this.props.history} handleSkip={()=>{
                     this.props.updateSetupScreen(this.props.systemState.setupScreen + 1)
                }} index={this.props.systemState.setupScreen}></Sliders>
                <div className='w-100 setup-page-container d-flex justify-content-center flex-column align-items-center'>
                    <div className='setup-page-section'>
                        {this.renderContent()}
                    </div>
                    {this.renderFooter()}
                </div>
            </>
        )
    }


}

export default withSystemState(withApiHandler(FinishProfilePage, ErrorHandler.TOAST));