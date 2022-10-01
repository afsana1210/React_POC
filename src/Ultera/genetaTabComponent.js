import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch,useSelector} from "react-redux";
import styles from "./../addPopup/addPopup.module.scss";
import {Icons} from "../../../../components/icons";
import {ICONS} from "../../../../utils/iconNames";
import {InputBox} from "../../../../components/inputBox";
import {INPUT_TYPE} from "../../../../utils/common";
import {Checkbox, TextArea} from "@blueprintjs/core";
import {updateWSConfigContextModel} from "../../../../slices/systemManagerSlice";
import { TextEditor } from "../../../../components/textEditor";
import { AutoSelect } from "../../../../components/autoSelect";
import {ComboBoxBuilder} from "../addPopup/comboBoxBuilder";
import { SearchTabComponent } from "./searchTabComponent";
// import {DateTime, Icons, InputBox, UserList} from "../index";

export const GeneralTabComponent= ({popupTitle, hideCounter, isFromQueue, isFromEmulators, isFromRuleSets, errorText, setErrorText, displayValueErrorText,
                                       setDisplayValueErrorText}) => {
    const {t}=useTranslation();
    const {showGlobalPopup}=useSelector((state) => state.dashboard);
    const {searchesConfigDetails, wsConfigCount, selectedSysManagerChild,sysManagerWSChoiceLists}=useSelector((state) => state.systemManager);
    const [openComboBoxPopup, setOpenComboBoxPopup] = useState({flag:false, data:null, currentIndex: null});
    const [searchInError, setSearchInError] = useState('');
    const [EmulatorRowError, setEmulatorRowError] = useState('0');
    const [Emulator, setEmulator] = useState([{caption:'EHLLAPI'}]);


    const [validationError, setValidationError] = useState({});
    const dispatch=useDispatch();

    useEffect(()=>{
        if(searchesConfigDetails && searchesConfigDetails?.name?.includes('[')){
            setErrorText("Name entered is not valid.");
        }else if(!errorText){
            setErrorText("");
        }
    },[searchesConfigDetails]);

    const onItemNameChange = (e) =>{
        dispatch(updateWSConfigContextModel({keyName:"name", value: e.target.value}));
        if(!e.target.value.includes('[') && !e.target.value?.trim() == '') {
            const letterNumber = /^[ 0-9a-zA-Z&._\-()\/]+$/;
            if((e.target.value.match(letterNumber))){
                setErrorText('')
            }else{
                setErrorText("Name entered is not valid.")
            }
        }else if(e.target.value?.trim() == ''){
            setErrorText('Name is required')
        }else if(e.target.value.includes('[') || e.target.value.includes(']')){
            setErrorText("Name entered is not valid.")
        }
    };

    const onItemNameBlur = (e) =>{
        if(e.target.value?.trim() === ""){
            dispatch(updateWSConfigContextModel({keyName:"name", value: e.target.value.trim()}));
            setErrorText('Name is required')
        }
    };

    const onDisplayValueChange = (e) =>{
        dispatch(updateWSConfigContextModel({keyName:"description", value: e.target.value}));
        const letterNumber = /^[ 0-9a-zA-Z._-]+$/;
        if((e.target.value.match(letterNumber))){
            setDisplayValueErrorText('')
        }else if(e.target.value === ""){
            setDisplayValueErrorText("Display Value is required.")
        }else{
            setDisplayValueErrorText("Display Value entered is not valid.")
        }
    };
    const onDisplayValueBlur = (e) =>{
         if(e.target.value?.trim() === ""){
                setDisplayValueErrorText("Display Value is required.");
                dispatch(updateWSConfigContextModel({keyName:"description", value: e.target.value.trim()}));
         }
    };

    const handleDescriptionChange = (e) =>{
        dispatch(updateWSConfigContextModel({keyName:"description", value: e.target.value}));
    };

    const onCounterChange = (keyName) =>{
        if(keyName === "allowUnassigned"){
            dispatch(updateWSConfigContextModel({keyName: keyName, value: !searchesConfigDetails?.allowUnassigned}));
        }else {
            dispatch(updateWSConfigContextModel({keyName: keyName, value: !searchesConfigDetails?.itemCounterEnabled}));
        }
    };

    const onObjectStoreSelected = (data) => {
        // setIsDirty(false);
        // dispatch(updateSelectedObjectStore(data));
        // dispatch(updateWSConfigContextModel({keyName: "objectStoreName", value: data?.id}));
    };

    const onRowNumChange = (e) =>{
        dispatch(updateWSConfigContextModel({keyName:"row", value: e.target.value}));
        if(!e.target.value.includes('0') && !e.target.value?.trim() == '') {
            const letterNumber = /^[ 1-9]+$/;
            if((e.target.value.match(letterNumber))){
                setEmulatorRowError('')
            }else{
                setEmulatorRowError("Number must be between 1 to 999.")
            }
        }else if(e.target.value?.trim() == ''){
            setEmulatorRowError('Number is required')
        }else if(e.target.value.includes('0') || e.target.value.includes('1000')){
            setEmulatorRowError("Number must be between 1 to 999.")
        }else if(e.target.value.includes('.')){
            setEmulatorRowError("Row enter is not valid.")
        }
    };
    const onScriptBlurHandle = (e) => {
        if (_.isEmpty( selectedScript )) {
            setScriptError("Script is required.");
        }
    };

    const onNumberBoxChange = (data, index, e) => {
        const pattern = /^[0-9]+$/;
        if (!pattern.test(e.target.value)) {
            setValidationError({
                error: t('INVALID_VALUE_MSG', {fieldName: t('admin.envmgt.import.mapping.source.title')}),
                index: index
            })
        } else if (e.target.value < -2147483648 || e.target.value > 2147483647) {
            setValidationError({
                error: t('RANGE_BETWEEN_MSG', {
                    labelText: 'Source',
                    min: '-2147483648',
                    max: '2147483647'
                }), index: index
            })
        } else {
            validationError.index === index && setValidationError('')
        }
    }

    return (
        <>
            <div className={styles.contentDiv}>
                <div className={styles.parentTextDiv} style={{paddingTop: 20}}>
                    { wsConfigCount > 0 ?
                        <div className={styles.wsCount}>
                            <Icons icon={ICONS.WHITE_ALERT_ICON}/>
                            <label style={{marginLeft: 5}}>
                                {`${wsConfigCount} Saved searches created by users are associated to this search template. Changes to this template could impact those saved searches.`}
                            </label>
                        </div>
                        : null
                    }
                    <div className={styles.targetedBox}>
                        <div className={styles.reqText}>{"* "}</div>
                        <div className={styles.targetText}
                             style={{width: 187}}>{`${t('sysmgr.fields.name.caption')}`}</div>
                        <div className={styles.inputBoxDiv}>
                            <InputBox
                                errorText={errorText}
                                inputType={INPUT_TYPE.TEXT}
                                isDisabled={popupTitle !== `${t('sysmgr.queues.config.title')}` ? false : showGlobalPopup === `${selectedSysManagerChild?.moduleName}-${t('ipd.widgets.button.edit.label')}`}
                                value={searchesConfigDetails?.name}
                                style={{border: errorText && "1px solid #9f0000"}}
                                width={"350px"}
                                height={"24px"}
                                maxLength={50}
                                onChange={onItemNameChange}
                                onBlur={onItemNameBlur}
                                inputTooltip={'Unique name used to identify the configuration.'}
                                tooltipPosition={"right"}
                                isFromAddWSConfig={true}
                            />
                        </div>
                    </div>
                    <div className={styles.targetedBox}>
                        {
                            popupTitle !== `${t('sysmgr.queues.config.title')}` ?
                                <>
                                    <div className={styles.targetText}
                                         style={{width: 200}}>{`${t('sysmgr.common.description.label')}`}</div>
                                    <TextArea
                                        spellCheck={false}
                                        style={{maxWidth: 350, minWidth: 350, resize: 'none'}}
                                        large={true}
                                        growVertically={false}
                                        maxLength={100}
                                        className={styles.textAreaStyle}
                                        onChange={handleDescriptionChange}
                                        value={searchesConfigDetails?.description}
                                    />
                                </>
                                :
                                <>
                                    <div className={styles.reqText}>{"* "}</div>
                                    <div className={styles.targetText}
                                         style={{width: 187}}>{`${t('sysmgr.queues.config.description.label')}:`}</div>
                                    <div className={styles.inputBoxDiv}>
                                        <InputBox
                                            errorText={displayValueErrorText}
                                            inputType={INPUT_TYPE.TEXT}
                                            isDisabled={false}
                                            value={searchesConfigDetails?.description}
                                            style={{border: displayValueErrorText && "1px solid #9f0000"}}
                                            width={"350px"}
                                            height={"24px"}
                                            maxLength={50}
                                            onChange={onDisplayValueChange}
                                            onBlur={onDisplayValueBlur}
                                            tooltipPosition={"right"}
                                            isFromAddWSConfig={true}
                                        />
                                    </div>
                                </>
                        }
                    </div>
                    {
                        hideCounter === false && popupTitle === `${t('sysmgr.queues.config.title')}` ?
                            <div className={styles.counterStyle}>
                                <Checkbox label={t('sysmgr.queues.config.allowunassigned.label')}
                                          checked={searchesConfigDetails?.allowUnassigned} style={{cursor: "text"}}
                                          alignIndicator={"right"} onChange={()=>{onCounterChange("allowUnassigned")}}/>
                            </div> :
                            hideCounter === false ?
                                <div className={styles.counterStyle}>
                                    <Checkbox label={"Counter"}
                                              checked={searchesConfigDetails?.itemCounterEnabled} style={{cursor: "text"}}
                                              alignIndicator={"right"} onChange={()=>{onCounterChange("itemCounterEnabled")}}/>
                                </div>
                                :
                                null
                    }
                    
                    
                    
                     {/* isFromEmulators === true && popupTitle === `${t('sysmgr.clientintegration.config.title')}` ? */}
                    {
                        isFromEmulators === true && popupTitle === `${t('sysmgr.clientintegration.emulator.config.title')}` ?
                        <>
                        
                        <div className={styles.targetedBox}>
                        <div className={styles.reqText}>{"* "}</div>
                        <div className={styles.targetText}
                             style={{width: 187}}>{`${t('sysmgr.clientintegration.emulatortype.instruction')}`}</div>
                             <div>
                             <AutoSelect
                                    loadData={null}
                                    loading={false}
                                    popoverWidth={240}
                                    editable={false}
                                    errorText={searchInError}
                                    dataList={Emulator}
                                    onItemSelected={onObjectStoreSelected}
                                    // onSelectQueryChange={onObjectStoreQueryChange}
                                    // selectedValue={selectedStoreObject}
                                    tooltipPosition={'left'} setErrorText={setSearchInError}
                                    requiredErrorText={"Object Store is required."}
                                    unValidText={"Object store entered is not valid. Please select a valid item from the selection list."}
                                    changeZIndex={1}
                                    needBlur={true}
                                    // onBlurEventHandle={onObjectStoreBlurHandle}
                                    isDisabled={showGlobalPopup === "showCriteriaDifference"}
                                />
                              </div>
                        </div>
                        
                         
                    <div className={styles.targetedBox}>
                        <div className={styles.reqText}>{"* "}</div>
                        <div className={styles.targetText}
                             style={{width: 187}}>{`${t('sysmgr.clientintegration.row.title')}`}</div>
                        <div className={styles.inputBoxDiv}>
                            <InputBox
                                errorText={EmulatorRowError}
                                inputType={INPUT_TYPE.NUMBER}
                                isDisabled={popupTitle !== `${t('sysmgr.queues.config.title')}` ? false : showGlobalPopup === `${selectedSysManagerChild?.moduleName}-${t('ipd.widgets.button.edit.label')}`}
                                value={searchesConfigDetails?.rows  }
                                style={{border: errorText && "1px solid #9f0000"}}
                                width={"100px"}
                                height={"24px"}
                                maxLength={50}
                                onChange={onRowNumChange}
                                onBlur={onItemNameBlur}
                                inputTooltip={'Unique name used to identify the configuration.'}
                                tooltipPosition={"right"} setErrorText={setEmulatorRowError}
                                isFromAddWSConfig={true}
                            />
                        </div>
                    </div>
                      
                    <div className={styles.targetedBox}>
                        <div className={styles.reqText}>{"* "}</div>
                        <div className={styles.targetText}
                             style={{width: 187}}>{`${t('sysmgr.clientintegration.column.title')}`}</div>
                        <div className={styles.inputBoxDiv}>
                            <InputBox
                                errorText={errorText}
                                inputType={INPUT_TYPE.NUMBER}
                                isDisabled={popupTitle !== `${t('sysmgr.queues.config.title')}` ? false : showGlobalPopup === `${selectedSysManagerChild?.moduleName}-${t('ipd.widgets.button.edit.label')}`}
                                value={searchesConfigDetails?.columns || 0}
                                style={{border: errorText && "1px solid #9f0000"}}
                                width={"100px"}
                                height={"24px"}
                                maxLength={50}
                                onChange={onItemNameChange}
                                onBlur={onItemNameBlur}
                                inputTooltip={'Row values must be between 1 and 999.'}
                                tooltipPosition={"right"}
                                isFromAddWSConfig={true}
                            />
                        </div>
                    </div> 
                    <div className={styles.targetedBox}>
                    <div className={styles.reqText}>{"* "}</div>
                    <div className={styles.targetText}
                            style={{width: 187}}>{`${t('sysmgr.clientintegration.sessionid.title')}`}</div>
                            <div>
                            <AutoSelect
                                loadData={null}
                                loading={false}
                                popoverWidth={240}
                                editable={false}
                                errorText={searchInError}
                                dataList={sysManagerWSChoiceLists ? sysManagerWSChoiceLists?.find(f=>f.name==='objectStores')?.selections : []}
                                onItemSelected={onObjectStoreSelected}
                                // onSelectQueryChange={onObjectStoreQueryChange}
                                // selectedValue={selectedStoreObject}
                                tooltipPosition={'left'} setErrorText={setSearchInError}
                                requiredErrorText={"Object Store is required."}
                                unValidText={"Object store entered is not valid. Please select a valid item from the selection list."}
                                changeZIndex={1}
                                needBlur={true}
                                // onBlurEventHandle={onObjectStoreBlurHandle}
                                isDisabled={showGlobalPopup === "showCriteriaDifference"}
                                scrollToActiveItem={true}
                            />
                        </div>
                    </div>
                        </>
                        :
                        null
                        
                    }
                    
                                            
                </div>
            </div>
        </>
    );
};
