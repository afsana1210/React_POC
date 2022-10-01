import React, { useEffect, useState } from 'react'
import styles from "./../addPopup/addPopup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ConfirmationDialog, Icons } from "../../../../components";
import { ICONS } from "../../../../utils/iconNames";
import { setReconcileNotification, setShowGlobalPopup } from '../../../../../src/slices/dashboardSlice';
import { Label} from "@blueprintjs/core";

import {
    resetWorksearchConfigData, setComboChoiceList,
    setSaveConfigLoading, updateTargetOperatorSource, updateTargetOperatorSourceForRules,
    updateWSConfigContextModel
} from "../../../../slices/systemManagerSlice";
import {setSaveSearchLoading} from "../../../../slices/dashboardSlice"
import {
    getAvailableRoles, getAvailableRoutes, getAvailableViewerSettings,
    getSysManagerSubChildScreenDetails, saveCaseSearchDetails, saveContentSearchDetails, saveQueueConfigurationDetails,
    saveWorkSearchConfigDetails, saveEmulatorDetails, saveHistorySearchDetails, saveCaseWorkbenchRulesDetails
} from "../../../../api/systemManager";
import _ from "lodash";
import {GeneralTabComponent} from "./generalTabComponent";
import {RolesTabComponents} from "./rolesTabComponent";
import {SearchTabComponent} from "./searchTabComponent";
import {RouteDestineTabComponents} from "./routeDestineTabComponents";
import {RouteReasonsTabComponents} from "./routeReasonsTabComponents";
import {HoldsTabComponents} from "./holdsTabComponents";
import {getDurationDiff, htmlDecode} from "../../../../utils/commonFunctions";
import {ViewerSettingsTabWorkbench} from "./viewerSettingsTabWorkbench";
import {ViewerSettingsTabComponent} from "./ViewerSettingTabComponent";
import {MatchingExpressionsComponent} from "./matchingExpressionsComponent";
import { ProcessStepsPopup } from './processStepsPopup';
import {
    processBrokerSelector,
    selectedViewStepsSelector,
    usingIndexBrokerSelector,
  } from "../../../../slices/systemMangerSelectors";


export const SearchesConfigComponent = ({ title, subTitle, arrayOfTabs, generalTabConfig, searchTabConfig, rolesTabConfig, viewerSettingsTabConfig,
                                            routeDestinationsTabConfig, routeReasonsTabConfig, holdTabConfig}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const selectedViewStepsSelectorList = useSelector((state) =>
    selectedViewStepsSelector(state)
  );
    const { showGlobalPopup, saveSearchLoading, loading } = useSelector((state) => state.dashboard);
    const { searchesConfigDetails, saveConfigLoading, resultsDefinitions, selectedRolesList, targetOperatorSourceState,targetOperatorSourceStateForRules, operatorMetaData,
        selectedSysManagerChild, searchesConfigCompleteJson, selectedSearchInObj, selectedSysManagerChildTableRow, criteriaDefinitions,
        searchesConfigMetaData, availableRolesList, dELoading, viewerSearchFieldDefinitions, updatedFieldData,viewerWorkbenchContextModel ,selectedSearchObjectStore,selectedEmulatorSessionId,selectedEmulatorType,subChildScreenDetails} = useSelector((state) => state.systemManager);
    const [errorText, setErrorText] = useState(searchesConfigDetails?.name?.includes("[") ? "Name entered is not valid." : '');
    const [selectedTabName, setSelectedTabName] = useState(showGlobalPopup === 'showCriteriaDifference' ? 'Search' : 'General');
    const [openCancelPopup, setOpenCancelPopup] = useState(false);
    const [openValidationException, setOpenValidationException] = useState(false);
    const [rowValidationError, setRowValidationError] = useState(null);
    const [openGeneralValidation, setOpenGeneralValidation] = useState(false);
    const [processNotApplied, setProcessNotApplied] = useState(true);
    const [openBackendException, setOpenBackendException] = useState("");
    const [rolesAPICalled, setRolesAPICalled] = useState(false);
    const [routeDestineAPICalled, setRouteDestineAPICalled] = useState(false);
    const [routeReasonAPICalled, setRouteReasonAPICalled] = useState(false);
    const [holdsAPICalled, setHoldsAPICalled] = useState(false);
    const [isRolesListChange, setIsRolesListChange] = useState(false);
    const [searchInAppliedWhileEdit, setSearchInAppliedWhileEdit] = useState(false);
    const [isDirty, setIsDirty] = useState(true);
    const [displayValueErrorText, setDisplayValueErrorText] = useState('');
    const [openQueueValidationException, setOpenQueueValidationException] = useState(false);
    const [error, setError] = useState('');
    const [maxError, setMaxError] = useState('');
    const [durUnitError, setDurUnitError] = useState('');
    const [maxDurUnitError, setMaxDurUnitError] = useState('');
    const [showDurationError, setShowDurationError] = useState(false);
    const [emulatorTypeError, setEmulatorTypeError] = useState('');
    const [emulatorRowError,setEmulatorRowError] = useState('');
    const [emulatorColumnError,setEmulatorColumnError] = useState('');
    const [emulatorSessionIDError, setEmulatorSessionIDError] = useState('');
    const [targetErrorText, setTargetErrorText] = useState('');
    const [checkFetchApi, setCheckFetchApi] = useState(true);
    const [showResultTableHeader, setShowResultTableHeader] = useState([]);
    const [scriptError,setScriptError]=useState('');
    const [emulatorError,setEmulatorError]=useState('');

    useEffect(()=>{
        if(searchesConfigDetails && searchesConfigDetails?.name?.includes('[')){
            setErrorText("Name entered is not valid.");
        }else if(!errorText){
            setErrorText("");
        }
    
        if( searchesConfigDetails?.rows === 0 ){
            setEmulatorRowError('Rows value must be between 1 and 999');
        }
        if( searchesConfigDetails?.columns === 0 ){
            setEmulatorColumnError('Columns value must be between 1 and 999');
        }
        
        if (showGlobalPopup === "showCriteriaDifference") {
            onTabDivClick('Search')
        }
        if((showGlobalPopup === `${selectedSysManagerChild?.moduleName}-${t('ipd.widgets.button.edit.label')}` ||
            showGlobalPopup === `${selectedSysManagerChild?.moduleName}-${t('ipd.widgets.button.copy.label')}` ||
            showGlobalPopup === "showCriteriaDifference") && !searchInAppliedWhileEdit){
            let clonedCriteria = criteriaDefinitions && [...criteriaDefinitions];
            clonedCriteria = _.map(clonedCriteria, (object)=>{
                return {...object, id: object.name}
            });

            let newObj = title == t('sysmgr.case.worbench.rules.config.title') ?  {
                id: 0,
                targetList: clonedCriteria,
                operatorList: [],
                sourceType: '',
                selectedTarget: null,
                selectedStartGroup:null,
                selectedEndGroup:null,
                selectedAndOrNOt:"",
                selectedOperator: null,
                selectedSource: null,
                sourceValue: null,
                isEditAndOrNot: false,
                isEditStartGroup: false,
                isEditTarget: false,
                isEditOperator: false,
                isEditSource: false,
                isEditEndGroup: false,
                validationError: '',
                runtimeSelect: false,
                multiselect: false,
                options: []
            } : {
                id: 0,
                targetList: clonedCriteria,
                propertyList: [
                    {id: 0, name: "editable", caption: "Editable"},
                    {id: 1, name: "hidden", caption: "Hidden"},
                    {id: 2, name: "readyOnly", caption: "Read Only"},
                    {id: 3, name: "requireAll", caption: "Require All"},
                    {id: 4, name: "requireOne", caption: "Require One"}],
                operatorList: [],
                sourceType: '',
                selectedTarget: null,
                selectedProperty: {id: 0, name: "editable", caption: "Editable"},
                selectedOperator: null,
                selectedSource: null,
                sourceValue:null,
                isEditTarget: false,
                isEditProperty: false,
                isEditOperator: false,
                isEditSource: false,
                validationError:'',
                runtimeSelect: false,
                multiselect: false,
                options: []
            };
            let newArray = [];
            _.map( searchesConfigDetails?.retrievalExpressions?.detailSet,(detail, index)=>{
                let newClonedObj = JSON.parse(JSON.stringify(newObj));
                newClonedObj.runtimeSelect = detail.runtimeSelect;
                newClonedObj.multiselect = detail.multiselect;
                newClonedObj.options = detail.options;
                newClonedObj.id = index + 1;
                newClonedObj.originalData = detail;
                let selectedTarget = _.filter(clonedCriteria, (criteria)=>{return criteria.name === detail.target});
                if(selectedTarget.length > 0){
                    newClonedObj.selectedTarget = selectedTarget[0];
                    let filtered = _.filter(operatorMetaData?.viewTypes, (view)=>{
                        return view.viewTypeValue === selectedTarget[0].viewType && view.typeValue === selectedTarget[0].type
                    });
                    if(filtered.length > 0) {
                        let operatorArr = [...operatorMetaData?.operatorMap[filtered[0]?.operatorSet]];
                        newClonedObj.operatorList = operatorArr;
                        newClonedObj.selectedSource = filtered[0];
                        let selectedOperator = _.filter(operatorArr, (operator)=>{return operator.id === detail.operator});
                        if(selectedOperator.length > 0){
                            newClonedObj.selectedOperator = selectedOperator[0]
                        }else{
                            newClonedObj.selectedOperator = null
                        }
                    }
                }else{
                    newClonedObj.selectedTarget = null
                }
                let selectedProperty = _.filter(newClonedObj.propertyList, (property)=>{return property.id === detail.visibility});
                if(title == t('sysmgr.case.worbench.rules.config.title')){
                    newClonedObj.startGroup=detail.startGroup;
                    newClonedObj.endGroup=detail.endGroup;
                    newClonedObj.selectedAndOrNOt= {id: detail?.andNotOr , name:detail?.andNotOr};
                }else{
                    if(selectedProperty.length > 0){
                        newClonedObj.selectedProperty = selectedProperty[0]
                    }else{
                        newClonedObj.selectedProperty = {id: 0, name: "editable", caption: "Editable"}
                    }
                }

                if(detail.source?.includes("lower")) {
                    newClonedObj.sourceValue = JSON.parse(detail.source);
                } else {
                    let filtered = [];
                    if(selectedTarget.length > 0) {
                        filtered = _.filter(operatorMetaData?.viewTypes, (view) => {
                            return view.viewTypeValue === selectedTarget[0].viewType && view.typeValue === selectedTarget[0].type
                        });
                    }
                    if (filtered.length > 0 && filtered[0]?.viewType === "USERSELECT" && detail.source !== "") {
                        let objNew = {id: -1, name: detail.source === "{CurrentUser}" ? "{Me}" : detail.source, description: detail.source === "{CurrentUser}" ? "{Me}" : detail.source };
                        newClonedObj.sourceValue = objNew
                    } else if(filtered.length > 0 && (filtered[0]?.viewType === "COMBO_BOX" || filtered[0]?.viewType === "ROLE_MULTI_SELECT") && detail.source !== ""){
                        newClonedObj.sourceValue = detail.source.includes("[") ? JSON.parse(detail.source) : detail.source ;
                        const localChoiceList = JSON.parse(searchesConfigMetaData?.choiceLists);
                        if (localChoiceList && localChoiceList.length > 0) {
                            let d = localChoiceList?.filter((row) => {
                                return row.name === newClonedObj?.selectedTarget?.choiceListName
                            });
                            if (d[0]?.selections?.length > 0) {
                                let newArray = [];
                                if(filtered[0]?.viewType === "ROLE_MULTI_SELECT"){
                                    newArray = d[0]?.selections.map((selection) => {
                                        const filteredOptionData = _.filter(newClonedObj.sourceValue, (option) => {
                                            return option == selection.description;
                                        });
                                        let optionData = null;
                                        if(filteredOptionData.length > 0){
                                            optionData = filteredOptionData[0];
                                        }
                                        let defaultValue = false;
                                        let includeValue = false;
                                        if(newClonedObj.runtimeSelect){
                                            includeValue = true;
                                            if(optionData){
                                                includeValue = optionData.includeOption;
                                                if(selection.name == newClonedObj.sourceValue){
                                                    defaultValue = true;
                                                }else{
                                                    defaultValue = optionData.defaultOption;
                                                }
                                            }else{
                                                if(selection.name == newClonedObj.sourceValue){
                                                    defaultValue = true;
                                                    includeValue = true;
                                                }
                                            }
                                        }else{
                                            if(optionData){
                                                includeValue = optionData.includeOption;
                                                if(selection.name == newClonedObj.sourceValue){
                                                    defaultValue = true;
                                                }else{
                                                    defaultValue = optionData.defaultOption;
                                                }
                                            }else{
                                                if(selection.name == newClonedObj.sourceValue){
                                                    defaultValue = true;
                                                    includeValue = true;
                                                }
                                            }
                                        }
                                        return {...selection, include: includeValue, default: defaultValue}
                                    });
                                }else{
                                    newArray = d[0]?.selections.map((selection) => {
                                        const filteredOptionData = _.filter(newClonedObj.options, (option) => {
                                            return option.name == selection.name;
                                        });
                                        let optionData = null;
                                        if(filteredOptionData.length > 0){
                                            optionData = filteredOptionData[0];
                                        }
                                        let defaultValue = false;
                                        let includeValue = false;
                                        if(newClonedObj.runtimeSelect){
                                            includeValue = true;
                                            if(optionData){
                                                includeValue = optionData.includeOption;
                                                if(selection.name == newClonedObj.sourceValue){
                                                    defaultValue = true;
                                                }else{
                                                    defaultValue = optionData.defaultOption;
                                                }
                                            }else{
                                                if(selection.name == newClonedObj.sourceValue){
                                                    defaultValue = true;
                                                    includeValue = true;
                                                }
                                            }
                                        }else{
                                            if(optionData){
                                                includeValue = optionData.includeOption;
                                                if(selection.name == newClonedObj.sourceValue){
                                                    defaultValue = true;
                                                }else{
                                                    defaultValue = optionData.defaultOption;
                                                }
                                            }else{
                                                if(selection.name == newClonedObj.sourceValue){
                                                    defaultValue = true;
                                                    includeValue = true;
                                                }
                                            }
                                        }
                                        return {...selection, include: includeValue, default: defaultValue}
                                    });
                                }

                                let newSendJSON = {
                                    showResultTable: newArray,
                                    isRuntimeFlag: newClonedObj.runtimeSelect,
                                    multiSelectFlag: newClonedObj.multiselect
                                };
                                newClonedObj.comboBoxValues = newSendJSON;
                            }
                        }
                    }else {
                        newClonedObj.sourceValue = detail.source
                    }
                }
                newArray.push(newClonedObj)
            });
            if(title == t('sysmgr.case.worbench.rules.config.title')){
                dispatch(updateTargetOperatorSourceForRules(newArray));
            }else{
                dispatch(updateTargetOperatorSource(newArray));
            }
            if(searchesConfigMetaData?.choiceLists && title !== t('sysmgr.clientintegration.emulator.config.title')){
                dispatch(setComboChoiceList(JSON.parse(searchesConfigMetaData?.choiceLists)))
            }
        }
    },[criteriaDefinitions]);
    const onTabDivClick = async (tabName) =>{
        setSelectedTabName(tabName);
        if(tabName === "Roles"){
            if(!rolesAPICalled) {
                if (showGlobalPopup === `${selectedSysManagerChild?.moduleName}-${t('ipd.widgets.button.add.label')}`) {
                    await getAvailableRoles(rolesTabConfig.rolesURL, 0);
                    setRolesAPICalled(true)
                } else {
                    await getAvailableRoles(rolesTabConfig.rolesURL, selectedSysManagerChildTableRow?.id);
                    setRolesAPICalled(true)
                }
            }
        }else if(tabName === "Route Destinations"){
            if(!routeDestineAPICalled) {
                if (showGlobalPopup === `${selectedSysManagerChild?.moduleName}-${t('ipd.widgets.button.add.label')}`) {
                    await getAvailableRoutes(routeDestinationsTabConfig.routeURL, 0);
                    setRouteDestineAPICalled(true)
                } else {
                    await getAvailableRoutes(routeDestinationsTabConfig.routeURL, selectedSysManagerChildTableRow?.id);
                    setRouteDestineAPICalled(true)
                }
            }
        }else if(tabName === "Route Reasons"){
            if(!routeReasonAPICalled) {
                if (showGlobalPopup === `${selectedSysManagerChild?.moduleName}-${t('ipd.widgets.button.add.label')}`) {
                    await getAvailableRoutes(routeReasonsTabConfig.routeURL, 0);
                    setRouteReasonAPICalled(true)
                } else {
                    await getAvailableRoutes(routeReasonsTabConfig.routeURL, selectedSysManagerChildTableRow?.id);
                    setRouteReasonAPICalled(true)
                }
            }
        }else if(tabName === "Hold"){
            if(!holdsAPICalled) {
                if (showGlobalPopup === `${selectedSysManagerChild?.moduleName}-${t('ipd.widgets.button.add.label')}`) {
                    await getAvailableRoutes(holdTabConfig.routeURL, 0);
                    setHoldsAPICalled(true)
                } else {
                    await getAvailableRoutes(holdTabConfig.routeURL, selectedSysManagerChildTableRow?.id);
                    setHoldsAPICalled(true)
                }
            }
        }
    };


    const handleOkClick = async () => {
        if(title ===  t('sysmgr.clientintegration.emulator.config.title')) {
            let error = false;     
            let originalJson = JSON.parse(searchesConfigCompleteJson?.contextModel);
            if (selectedTabName === 'General' && searchesConfigDetails?.name.trim() === "" || errorText !== "" || searchesConfigDetails.sessionId === '' || emulatorRowError!== "" || emulatorColumnError!=="" || emulatorSessionIDError!=="" || emulatorTypeError!=="" || (searchesConfigDetails.emulatorType === '' && ( !selectedEmulatorType && !searchesConfigDetails.emulatorType) || !searchesConfigDetails.emulatorType ) || !searchesConfigDetails.sessionId) {
                    setOpenGeneralValidation(true)
                    error=true;
                }else if ((JSON.stringify(originalJson) !== JSON.stringify(searchesConfigDetails)) || (JSON.stringify(originalJson) === JSON.stringify(searchesConfigDetails) &&
                (showGlobalPopup === `${selectedSysManagerChild?.moduleName}-${t('ipd.widgets.button.edit.label')}`))) {
                    if (selectedTabName === 'General' && searchesConfigDetails?.name.trim() === "" || errorText !== "" || searchesConfigDetails.sessionId === '' || emulatorRowError!== "" || emulatorColumnError!=="" || emulatorSessionIDError!=="" || emulatorTypeError!=="" || (searchesConfigDetails.emulatorType === '' && ( !selectedEmulatorType && !searchesConfigDetails.emulatorType) || !searchesConfigDetails.emulatorType ) || !searchesConfigDetails.sessionId) {
                        setOpenGeneralValidation(true)
                        error=true;
                }
            }

                if (!error) { 
                    let responseData = await saveEmulatorDetails(searchesConfigDetails); 
                    if (!responseData.exception) {
                        setOpenValidationException(false);
                        setOpenGeneralValidation(false);
                        dispatch(setShowGlobalPopup(''));
                        await getSysManagerSubChildScreenDetails(selectedSysManagerChild.moduleName, true);
                        dispatch(resetWorksearchConfigData());
                        setErrorText("");
                    } else if (responseData.exception) {
                        setOpenBackendException(responseData?.exceptionVO?.message)
                    }
                } else {
                    setOpenGeneralValidation(true);
                }
             
        }else if(title ===  t('sysmgr.contentsearch.config.title') || title === t('sysmgr.casesearch.config.title')
        || title === t('sysmgr.historysearch.config.title')) {
            setRowValidationError(null);
            let originalJson = JSON.parse(searchesConfigCompleteJson?.contextModel);
            if (selectedTabName === 'General' && (searchesConfigDetails?.name.trim() === "" || errorText !== "")) {
                setOpenGeneralValidation(true)
            } else if (searchesConfigDetails.name?.includes('[') ||
                errorText !== "" || isDirty === false) {
                setOpenValidationException(true);
            }else if ((JSON.stringify(originalJson) !== JSON.stringify(searchesConfigDetails)) || (JSON.stringify(originalJson) === JSON.stringify(searchesConfigDetails) &&
                (showGlobalPopup === `${selectedSysManagerChild?.moduleName}-${t('ipd.widgets.button.edit.label')}`))) {
                if (searchesConfigDetails.name?.includes('[') ||
                   errorText !== "" || isDirty === false) {
                    setOpenValidationException(true);
                } else {
                    let searchResult = resultsDefinitions?.map((row, index) => {
                        return ((row?.show && row.show === true) || (row?.show===undefined && row?.fieldDefinition?.isVisible)) ? {
                            attribute: 1,
                            columnWidth: row?.columnWidth,
                            id: 0,
                            name: row.fieldDefinition?.name,
                            orderBy: index,
                            type: row.fieldDefinition?.type
                        } : null
                    });
                    let newSearchResult = _.filter(searchResult, (head) => {
                        return head !== null
                    });
                    let sendJSON = JSON.parse(JSON.stringify(searchesConfigDetails));
                    sendJSON.searchResults = newSearchResult;
                    if (sendJSON?.sortByTemplates?.length > 0) {
                        sendJSON.indexName = sendJSON?.sortByTemplates[0]?.sortByName
                    } else {
                        sendJSON.indexName = ''
                    }
                    if (selectedRolesList?.length > 0) {
                        let filterRoles = [];
                        _.each(selectedRolesList, (role) => {
                            if (searchesConfigDetails?.filterRoles.length !== 0) {
                                let filteredObj = _.filter(searchesConfigDetails?.filterRoles, (data) => {
                                    return data.roleId === role.id
                                });
                                if (filteredObj?.length > 0) {
                                    filterRoles.push({id: filteredObj[0]?.id, roleId: role.id})
                                } else {
                                    filterRoles.push({id: "0", roleId: role.id})
                                }
                            } else {
                                filterRoles.push({id: "0", roleId: role.id})
                            }
                        });
                        sendJSON.filterRoles = filterRoles
                    } else if (selectedRolesList?.length === 0 && availableRolesList?.length !== 0) {
                        sendJSON.filterRoles = []
                    }
                    let detailSet = [];

                    _.each(targetOperatorSourceState, (data, index) => {
                        if (!data.originalData) {
                            detailSet.push({
                                new: true,
                                caption:data.selectedTarget?.caption,
                                target: data.selectedTarget?.name,
                                visibility: data.selectedProperty?.id,
                                operator: data.selectedOperator?.id,
                                source: typeof data.sourceValue == "object" && data.selectedSource?.viewType === "USERSELECT" ? data.sourceValue?.name : typeof data.sourceValue == "object" ?
                                    JSON.stringify(data.sourceValue) : data.sourceValue,
                                orderBy: index,
                                options: data.options,
                                choiceListConfig: 1,
                                multiselect: data.multiselect,
                                runtimeSelect: data.runtimeSelect,
                                sourceElementName: ""
                            })
                        } else {
                            let clonedObj = JSON.parse(JSON.stringify(data.originalData));
                            clonedObj = {
                                ...clonedObj, target: data.selectedTarget?.name,
                                visibility: data.selectedProperty?.id,
                                operator: data.selectedOperator?.id,
                                source: typeof data.sourceValue == "object" && data.selectedSource?.viewType === "USERSELECT" ? data.sourceValue?.name : typeof data.sourceValue == "object" ?
                                    JSON.stringify(data.sourceValue) : data.sourceValue,
                                orderBy: index,
                                options: data.options,
                                multiselect: data.multiselect,
                                runtimeSelect: data.runtimeSelect
                            };
                            detailSet.push(clonedObj)
                        }
                    });
                    sendJSON.retrievalExpressions["detailSet"] = detailSet;
                    let error = false;
                    let errorHTML = [];
                    if (sendJSON?.retrievalExpressions?.detailSet?.length === 0) {
                        errorHTML.push(
                            <div key={"expression"} className={styles.parentBullet}>
                                <div className={styles.bulletStyle}/>
                                At least one expression is required.
                            </div>
                        );
                        error = true;
                    } else {
                        _.each(sendJSON.retrievalExpressions?.detailSet, (data, index) => {
                            if (data.target == '' || data.target == 'null' || data.target == undefined) {
                                errorHTML.push(
                                    <div key={index} className={styles.parentBullet}>
                                        <div className={styles.bulletStyle}/>
                                        Target is required.
                                    </div>
                                );
                                error = true;
                            }
                            if (data.operator == undefined || data.operator == '' || data.operator == -1 || data.visibility == undefined) {
                                errorHTML.push(
                                    <div key={data.target} className={styles.parentBullet}>
                                        <div className={styles.bulletStyle}/>
                                        {sendJSON.retrievalExpressions?.detailSet.length<= 1 ? "Operator is required." : data.caption ?`${data.caption} is required.`: 'Operator is required.'}
                                    </div>
                                );
                                error = true;
                            }
                        })
                    }
                    const updatedDocPropData = _.map(viewerWorkbenchContextModel, (row, index) => {
                        return {
                            new: false,
                            attribute: row.attribute,
                            id: 0,
                            name: row.id,
                            orderBy: index,
                            type: 1,
                        }
                    })
                    if(title ===  t('sysmgr.contentsearch.config.title') || title ===  t('sysmgr.historysearch.config.title')) {
                        const listPropertiesData = viewerSearchFieldDefinitions.filter(f => f.show || (f?.show === undefined && f?.fieldDefinition?.isVisible));
                        const listPropData = _.map(listPropertiesData, (row, index) => {
                            return {
                                new: false,
                                attribute: 1,
                                id: "0",
                                name: row.fieldDefinition?.name,
                                orderBy: index,
                                type: "2",
                                columnWidth: row.columnWidth,
                            }
                        })
                        sendJSON.viewerSettings.docProperties = updatedDocPropData ?? [];
                        sendJSON.viewerSettings.listProperties = listPropData ?? [];
                    }
                    if (!error) {
                        let responseData = title ===  t('sysmgr.contentsearch.config.title') ? await saveContentSearchDetails(sendJSON) :
                        title === t('sysmgr.historysearch.config.title') ? await saveHistorySearchDetails(sendJSON) : await saveCaseSearchDetails(sendJSON);
                        if (!responseData.exception) {
                            dispatch(setShowGlobalPopup(''));
                            await getSysManagerSubChildScreenDetails(selectedSysManagerChild.moduleName, true);
                            setSelectedTabName('General');
                            dispatch(resetWorksearchConfigData());
                            setErrorText("");
                            setRolesAPICalled(false);
                            setIsRolesListChange(false);
                            setSearchInAppliedWhileEdit(false);
                        } else if (responseData.exception) {
                            setOpenBackendException(responseData?.exceptionVO?.message)
                        }
                    } else {
                        setRowValidationError(errorHTML);
                        setOpenValidationException(true);
                    }
                }
            }

        }else if (title == t('sysmgr.case.worbench.rules.config.title')) {
            setRowValidationError(null);
            let sendJSON = JSON.parse(JSON.stringify(searchesConfigDetails));
            let error = false;
            let errorHTML = [];
           // if (selectedTabName === 'General' && (searchesConfigDetails?.name.trim() === "" || errorText !== "") &&  isDirty == true) {
           //      setOpenGeneralValidation(true)
           //     error=true;
           //  } else if ((searchesConfigDetails.name?.includes('[') ||
           //    errorText !== "" )&& isDirty === true) {
           //      setOpenValidationException(true);
           //     error=true;
           //  }


               if ((searchesConfigDetails?.name.trim() === "")) {
                   errorHTML.push(<div className={styles.parentBullet}>
                       <div className={styles.bulletStyle}/>
                       {"Name is required."}
                   </div>);
                   error = true;
               }
               if ((searchesConfigDetails?.name.trim() !== "") && (searchesConfigDetails.name.includes("[") || searchesConfigDetails.name.includes("]") || errorText !== "") ) {
                   errorHTML.push(<div className={styles.parentBullet}>
                       <div className={styles.bulletStyle}/>
                       {"Name entered is not valid."}
                   </div>);
                   error = true;
               }
            if (isDirty==false || (isDirty===true && error==false )) {
               let detailSet = [];

               _.each(targetOperatorSourceStateForRules, (data, index) => {
                   if (!data.originalData) {
                       detailSet.push({
                           new: true,
                           caption: data.selectedTarget?.caption,
                           andNotOr: data.selectedAndOrNOt?.id,
                           startGroup: data?.startGroup,
                           endGroup: data?.endGroup,
                           target: data.selectedTarget?.name,
                           operator: data.selectedOperator?.id,
                           source: typeof data.sourceValue == "object" && data.selectedSource?.viewType === "USERSELECT" ? data.sourceValue?.name : typeof data.sourceValue == "object" ?
                             JSON.stringify(data.sourceValue) : data.sourceValue,
                           orderBy: index,
                           options: data.options,
                           choiceListConfig: 1,
                           multiselect: data.multiselect,
                           runtimeSelect: data.runtimeSelect,
                           sourceElementName: ""
                       })
                   } else {
                       let clonedObj = JSON.parse(JSON.stringify(data.originalData));
                       clonedObj = {
                           ...clonedObj,
                           caption: data.selectedTarget?.caption,
                           andNotOr: data.selectedAndOrNOt?.id,
                           startGroup: data?.startGroup,
                           endGroup: data?.endGroup,
                           target: data.selectedTarget?.name,
                           operator: data.selectedOperator?.id,
                           source: typeof data.sourceValue == "object" && data.selectedSource?.viewType === "USERSELECT" ? data.sourceValue?.name : typeof data.sourceValue == "object" ?
                             JSON.stringify(data.sourceValue) : data.sourceValue,
                           orderBy: index,
                           options: data.options,
                           multiselect: data.multiselect,
                           runtimeSelect: data.runtimeSelect
                       };
                       detailSet.push(clonedObj)
                   }
               });
               sendJSON.retrievalExpressions["detailSet"] = detailSet;
               if (sendJSON?.alwaysTrue !== true) {
                   if (sendJSON?.retrievalExpressions?.detailSet?.length === 0) {
                       errorHTML.push(
                         <div key={"expression"} className={styles.parentBullet}>
                             <div className={styles.bulletStyle}/>
                             At least one expression is required.
                         </div>
                       );
                       error = true;
                   } else {
                       _.each(sendJSON.retrievalExpressions?.detailSet, (data, index) => {
                           if (index !== 0 && (data.andNotOr == '' || data.andNotOr == 'null' || data.andNotOr == undefined)) {
                               errorHTML.push(
                                 <div key={index} className={styles.parentBullet}>
                                     <div className={styles.bulletStyle}/>
                                     AND/OR/NOT is required.
                                 </div>
                               );
                               error = true;
                           }
                           if (data.target == '' || data.target == 'null' || data.target == undefined || (targetOperatorSourceStateForRules[index].targetValidationError && targetOperatorSourceStateForRules[index].targetValidationError!="")) {
                               errorHTML.push(
                                 <div key={index} className={styles.parentBullet}>
                                     <div className={styles.bulletStyle}/>
                                     Target is required.
                                 </div>
                               );
                               error = true;

                               let clonedState = JSON.parse(JSON.stringify(targetOperatorSourceStateForRules));

                               if(targetOperatorSourceStateForRules[index].targetValidationError && targetOperatorSourceStateForRules[index].targetValidationError!==""){
                                   setTargetErrorText("Target is required");
                                   clonedState[index].targetValidationError="Target is required"
                                   clonedState[index].sourceValue = null;
                                   clonedState[index].selectedTarget=null;
                               }
                               dispatch(updateTargetOperatorSourceForRules(clonedState));
                           }
                           if (data.operator == undefined || data.operator == '' || data.operator == -1) {
                               errorHTML.push(
                                 <div key={data.target} className={styles.parentBullet}>
                                     <div className={styles.bulletStyle}/>
                                     {sendJSON.retrievalExpressions?.detailSet.length < 1 ? "Operator is required." : data.caption ? `${data.caption} is required.` : 'Operator is required.'}
                                 </div>
                               );
                               error = true;
                           }
                           if ((!data.operator || (data.operator !== "IS EMPTY" && data.operator !== "IS NOT EMPTY")) && ((!data.source || data.source == 'null' || targetOperatorSourceStateForRules[index].validationError!="") || (targetOperatorSourceStateForRules[index].targetValidationError && targetOperatorSourceStateForRules[index].targetValidationError!=""))) {
                               errorHTML.push(
                                 <div key={index} className={styles.parentBullet}>
                                     <div className={styles.bulletStyle}/>
                                     {sendJSON.retrievalExpressions?.detailSet.length < 1 ? "Source is required." : data.caption ? `${data.caption} is required.` : 'Source is required.'}

                                 </div>
                               );
                               error = true;
                           }

                       })
                   }
               }
               if (sendJSON?.workbenchId == '' || sendJSON?.workbenchId == null || sendJSON?.workbenchId == undefined) {
                   errorHTML.push(<div className={styles.parentBullet}>
                       <div className={styles.bulletStyle}/>
                       {"Case Workbench is required."}
                   </div>);
                   error = true;
               }
           }
            if (!error){
                let responseData = await saveCaseWorkbenchRulesDetails(sendJSON,subChildScreenDetails,(showGlobalPopup === `${selectedSysManagerChild?.moduleName}-${t('ipd.widgets.button.edit.label')}`));
                if (!responseData?.exception) {
                    dispatch(setShowGlobalPopup(''));
                   setSelectedTabName('General');
                    dispatch(resetWorksearchConfigData());
                    setErrorText("");
                    setRolesAPICalled(false);
                    setIsRolesListChange(false);
                    setSearchInAppliedWhileEdit(false);
                } else if (responseData?.exception) {
                    setOpenBackendException(htmlDecode(responseData?.exceptionVO?.message))
                }
            }else{
                setRowValidationError(errorHTML);
                setOpenValidationException(true);
            }
        }
        else if(title !==  t('sysmgr.queues.config.title')) {
            let originalJson = JSON.parse(searchesConfigCompleteJson?.contextModel);
            if (selectedTabName === 'General' && searchesConfigDetails?.name.trim() === "" || errorText !== "") {
                setOpenGeneralValidation(true)
            } else if ((JSON.stringify(originalJson) !== JSON.stringify(searchesConfigDetails)) || (JSON.stringify(originalJson) === JSON.stringify(searchesConfigDetails) &&
                (showGlobalPopup === `${selectedSysManagerChild?.moduleName}-${t('ipd.widgets.button.edit.label')}`))) {
                if (searchesConfigDetails.searchInName === '' || searchesConfigDetails.name?.includes('[') || selectedSearchInObj && selectedSearchInObj.id === 0 ||
                    searchesConfigDetails.templateProcesses.length === 0 || errorText !== "" || isDirty === false) {
                    setOpenValidationException(true);
                } else {
                    let searchResult = resultsDefinitions?.map((row, index) => {
                        return (row.show === undefined || (row?.show && row.show === true)) ? {
                            attribute: 1,
                            columnWidth: row?.columnWidth,
                            id: 0,
                            name: row.fieldDefinition?.name,
                            orderBy: index,
                            type: row.fieldDefinition?.type
                        } : null
                    });
                    let newSearchResult = _.filter(searchResult, (head) => {
                        return head !== null
                    });
                    let sendJSON = JSON.parse(JSON.stringify(searchesConfigDetails));
                    sendJSON.searchResults = newSearchResult;
                    if (sendJSON?.sortByTemplates.length > 0) {
                        sendJSON.indexName = sendJSON?.sortByTemplates[0].sortByName
                    } else {
                        sendJSON.indexName = ''
                    }
                    if (selectedRolesList.length > 0) {
                        let filterRoles = [];
                        _.each(selectedRolesList, (role) => {
                            if (searchesConfigDetails.filterRoles.length !== 0) {
                                let filteredObj = _.filter(searchesConfigDetails.filterRoles, (data) => {
                                    return data.roleId === role.id
                                });
                                if (filteredObj.length > 0) {
                                    filterRoles.push({id: filteredObj[0].id, roleId: role.id})
                                } else {
                                    filterRoles.push({id: "0", roleId: role.id})
                                }
                            } else {
                                filterRoles.push({id: "0", roleId: role.id})
                            }
                        });
                        sendJSON.filterRoles = filterRoles
                    }else if(selectedRolesList.length === 0 && availableRolesList.length !== 0){
                        sendJSON.filterRoles = []
                    }
                    let detailSet = [];
                    _.each(targetOperatorSourceState, (data, index) => {
                        if (!data.originalData) {
                            detailSet.push({
                                new: true,
                                target: data.selectedTarget?.name,
                                visibility: data.selectedProperty?.id,
                                operator: data.selectedOperator?.id,
                                source: typeof data.sourceValue == "object" && data.selectedSource?.viewType === "USERSELECT" ? data.sourceValue?.name : typeof data.sourceValue == "object" ?
                                    JSON.stringify(data.sourceValue) : data.sourceValue,
                                orderBy: index,
                                options: data.options,
                                choiceListConfig: 1,
                                multiselect: data.multiselect,
                                runtimeSelect: data.runtimeSelect,
                                sourceElementName: ""
                            })
                        } else {
                            let clonedObj = JSON.parse(JSON.stringify(data.originalData));
                            clonedObj = {
                                ...clonedObj, target: data.selectedTarget?.name,
                                visibility: data.selectedProperty?.id,
                                operator: data.selectedOperator?.id,
                                source: typeof data.sourceValue == "object" && data.selectedSource?.viewType === "USERSELECT" ? data.sourceValue?.name : typeof data.sourceValue == "object" ?
                                    JSON.stringify(data.sourceValue) : data.sourceValue,
                                orderBy: index,
                                options: data.options,
                                multiselect: data.multiselect,
                                runtimeSelect: data.runtimeSelect
                            };
                            detailSet.push(clonedObj)
                        }
                    });
                    sendJSON.retrievalExpressions["detailSet"] = detailSet;
                    let error = false;
                    let errorHTML = [];
                    if (sendJSON.retrievalExpressions?.detailSet.length === 0) {
                        errorHTML.push(
                            <div key={"expression"} className={styles.parentBullet}>
                                <div className={styles.bulletStyle}/>
                                At least one expression is required.
                            </div>
                        );
                        error = true;
                    } else {
                        _.each(sendJSON.retrievalExpressions?.detailSet, (data, index) => {
                            if (data.target == '' || data.target == 'null' || data.target == undefined) {
                                errorHTML.push(
                                    <div key={index} className={styles.parentBullet}>
                                        <div className={styles.bulletStyle}/>
                                        Target is required.
                                    </div>
                                );
                                error = true;
                            } else if (data.operator == undefined || data.operator == '' || data.operator == -1 || data.visibility == undefined) {
                                errorHTML.push(
                                    <div key={data.target} className={styles.parentBullet}>
                                        <div className={styles.bulletStyle}/>
                                        {data.target} is required.
                                    </div>
                                );
                                error = true;
                            }
                        })
                    }
                    if (!error) {
                        const responseData = await saveWorkSearchConfigDetails(sendJSON);
                        if (!responseData.exception) {
                            dispatch(setShowGlobalPopup(''));
                            // TODO : avoid scroll #H8 UTU-624
                            if (!showGlobalPopup.includes('Edit')) {
                                await getSysManagerSubChildScreenDetails(selectedSysManagerChild.moduleName);
                            }
                            setSelectedTabName('General');
                            dispatch(resetWorksearchConfigData());
                            setErrorText("");
                            setRolesAPICalled(false);
                            setIsRolesListChange(false);
                            setSearchInAppliedWhileEdit(false);
                        } else if (responseData.exception) {
                            setOpenBackendException(responseData?.exceptionVO?.message)
                        }
                    } else {
                        setRowValidationError(errorHTML);
                        setOpenValidationException(true);
                    }
                }
            } else {
                if (selectedTabName === 'General') {
                    setOpenGeneralValidation(true)
                } else {
                    setOpenValidationException(true)
                }
            }
        }
        else {
            //Save Queue configuration
            if (searchesConfigDetails.name?.includes('[') || searchesConfigDetails.name === "" || errorText !== "" || searchesConfigDetails?.description === "" ||
                displayValueErrorText !== "" || searchesConfigDetails?.defaultHoldDuration == "" || error !== "" || searchesConfigDetails?.defaultHoldDurationUnit == "" ||
                durUnitError !== "" || searchesConfigDetails?.maxHoldDuration == "" || maxError !== "" || searchesConfigDetails?.maxHoldDurationUnit == "" || maxDurUnitError !== "" || searchesConfigDetails?.emulatorType === "") {
                if (searchesConfigDetails?.defaultHoldDuration != "" && error === "" && searchesConfigDetails?.defaultHoldDurationUnit != "" &&
                    durUnitError === "" && searchesConfigDetails?.maxHoldDuration != "" && maxError === "" && searchesConfigDetails?.maxHoldDurationUnit != "" && maxDurUnitError === "") {
                    const result = getDurationDiff(searchesConfigDetails?.defaultHoldDuration, searchesConfigDetails?.defaultHoldDurationUnit, searchesConfigDetails?.maxHoldDuration, searchesConfigDetails?.maxHoldDurationUnit)
                    setShowDurationError(result !== true)
                }
                setOpenQueueValidationException(true)
            } else if (searchesConfigDetails?.defaultHoldDuration != "" && error === "" && searchesConfigDetails?.defaultHoldDurationUnit != "" &&
                durUnitError === "" && searchesConfigDetails?.maxHoldDuration != "" && maxError === "" && searchesConfigDetails?.maxHoldDurationUnit != "" && maxDurUnitError === "") {
                const result = getDurationDiff(searchesConfigDetails?.defaultHoldDuration, searchesConfigDetails?.defaultHoldDurationUnit, searchesConfigDetails?.maxHoldDuration, searchesConfigDetails?.maxHoldDurationUnit)
                setShowDurationError(result !== true);
                if(result === false) {
                    setOpenQueueValidationException(true)
                }else {
                    const sendJson = JSON.parse(JSON.stringify(searchesConfigDetails));
                    if (searchesConfigDetails.defaultHoldDurationUnit.charAt(searchesConfigDetails.defaultHoldDurationUnit.length - 1) === "s") {
                        sendJson.defaultHoldDurationUnit = searchesConfigDetails.defaultHoldDurationUnit.substring(0, searchesConfigDetails.defaultHoldDurationUnit.length - 1);
                    }
                    if (searchesConfigDetails?.maxHoldDurationUnit.charAt(searchesConfigDetails?.maxHoldDurationUnit?.length - 1) === "s") {
                        sendJson.maxHoldDurationUnit = searchesConfigDetails.maxHoldDurationUnit.substring(0, searchesConfigDetails.maxHoldDurationUnit.length - 1);
                    }
                    if (searchesConfigDetails?.allowUnassigned == true) {
                        sendJson.allowUnassigned = 1
                    } else if (searchesConfigDetails?.allowUnassigned == false) {
                        sendJson.allowUnassigned = 0
                    }
                    const response = await saveQueueConfigurationDetails(sendJson);
                    if (!response.exception) {
                        dispatch(setShowGlobalPopup(''));
                        await getSysManagerSubChildScreenDetails(selectedSysManagerChild.moduleName);
                        setSelectedTabName('General');
                        dispatch(resetWorksearchConfigData());
                        setOpenCancelPopup(false);
                        setRolesAPICalled(false);
                        setRouteDestineAPICalled(false);
                        setRouteReasonAPICalled(false);
                        setHoldsAPICalled(false);
                        setDisplayValueErrorText("");
                        setErrorText("");
                        setError("");
                        setDurUnitError("");
                        setMaxError("");
                        setMaxDurUnitError("");
                    }else{
                        if(response?.exceptionVO){
                            setOpenBackendException(response?.exceptionVO?.message)
                        }
                    }
                }
            }
        }
    };
    const onOkClose = () => {
        if(title !== t('sysmgr.queues.config.title')) {
            let error = false;
            if ((searchesConfigDetails?.retrievalExpressions?.detailSet.length !== targetOperatorSourceState.length) && targetOperatorSourceState.length > 1) {
                error = true
            }
            if(targetOperatorSourceState.length > 1 && showGlobalPopup === `${selectedSysManagerChild?.moduleName}-${t('ipd.widgets.button.add.label')}`) {
                _.map(targetOperatorSourceState, (row, index) => {
                    if (row.selectedTarget?.id != searchesConfigDetails?.retrievalExpressions?.detailSet[index]?.target) {
                        error = true
                    } else if (row.selectedOperator?.id != searchesConfigDetails?.retrievalExpressions?.detailSet[index]?.operator) {
                        error = true
                    } else if (row.selectedProperty?.id != searchesConfigDetails?.retrievalExpressions?.detailSet[index]?.visibility) {
                        error = true
                    } else if (row.sourceValue != searchesConfigDetails?.retrievalExpressions?.detailSet[index]?.source) {
                        error = true
                    }
                });
            }
            let originalJson = searchesConfigCompleteJson?.contextModel;
            if (originalJson !== JSON.stringify(searchesConfigDetails) || isRolesListChange === true || selectedTabName === "Search" || selectedTabName === "Viewer Settings" || selectedTabName === "Roles") {
                setOpenCancelPopup(true);
            } else if (error) {
                setOpenCancelPopup(true);
            } else {
                dispatch(setShowGlobalPopup(''));
                setSelectedTabName('General');
                dispatch(resetWorksearchConfigData());
                setOpenCancelPopup(false);
                setRolesAPICalled(false);
                setErrorText("");
                setSearchInAppliedWhileEdit(false);
            }
        }else{
            dispatch(setShowGlobalPopup(''));
            setSelectedTabName('General');
            dispatch(resetWorksearchConfigData());
            setOpenCancelPopup(false);
            setRolesAPICalled(false);
            setRouteDestineAPICalled(false);
            setRouteReasonAPICalled(false);
            setHoldsAPICalled(false);
            setDisplayValueErrorText("");
            setErrorText("");
        }
    };
    const onCancelContinueClick = () =>{
        dispatch(setReconcileNotification(false))
        dispatch(setShowGlobalPopup(''));
        setSelectedTabName('General');
        dispatch(resetWorksearchConfigData());
        setErrorText("");
        setOpenCancelPopup(false);
        setRolesAPICalled(false);
        setIsRolesListChange(false);
        setSearchInAppliedWhileEdit(false);

    };
    return (
        <>
            {(showGlobalPopup === `${selectedSysManagerChild?.moduleName}-${t('ipd.widgets.button.add.label')}`) ||
            (showGlobalPopup === `${selectedSysManagerChild?.moduleName}-${t('ipd.widgets.button.edit.label')}`) ||
            (showGlobalPopup === `${selectedSysManagerChild?.moduleName}-${t('ipd.widgets.button.copy.label')}`) ||
            (showGlobalPopup === 'showCriteriaDifference') ?
                <ConfirmationDialog
                    width={window.screen.width > 1700 ? 1400 : searchTabConfig?.searchTitle === "Attachment Search" ? 1100 : 1024}
                    divideByX={window.screen.width > 1700 ? 40 : -10}
                    divideByY={window.screen.width > 1700 ? 15 : -35}
                    showDialog={true}
                    headerText={t('ultera.login.productname') + ':' + title}
                    onClose={() => showGlobalPopup === "showCriteriaDifference" ? onCancelContinueClick() : onOkClose()}
                    body={
                        <>
                            <div style={{height: window.screen.width > 1700 ? 700 : 500}}>
                                {dELoading ?
                                    <div className={styles.loadingContainerStyle}>
                                        <div className={styles.loadingGifStyle} />
                                        <h3 style={{ paddingLeft: '10px' }}>{t('DIALOG_STATUS_LOADING')}</h3>
                                    </div> :
                            <span>
                                <div className={styles.subHeader}>
                                    <div className={styles.headerLabelBox}>
                                        <Icons icon={ICONS.MODULE_PREFERENCES} />
                                        <div className={styles.headerText}>{subTitle}</div>
                                    </div>
                                    <div className={styles.requiredText}>* {t('label.common.required')}</div>
                                </div>
                                <div className={styles.parentTab}>
                                    <div className={styles.tabHeaderStyle}>
                                        {
                                            _.map(arrayOfTabs,(tab)=>{
                                                return <div key={tab} className={selectedTabName === tab ? styles.selectedStyle :styles.tabStyle} onClick={()=>{onTabDivClick(tab)}}>{tab}</div>
                                            })
                                        }
                                    </div>
                                    {
                                        selectedTabName === "General" ?
                                            <GeneralTabComponent popupTitle={title} hideCounter={generalTabConfig.hideCounter} isFromEmulators={generalTabConfig.isFromEmulators} isFromQueue={generalTabConfig.isFromQueue}
                                            isFromRuleSets={generalTabConfig.isFromRuleSets} errorText={errorText} setErrorText={setErrorText} setDisplayValueErrorText={setDisplayValueErrorText}
                                                                 displayValueErrorText={displayValueErrorText}  emulatorTypeError={emulatorTypeError} setEmulatorTypeError={setEmulatorTypeError} emulatorRowError={emulatorRowError} setEmulatorRowError={setEmulatorRowError} emulatorColumnError={emulatorColumnError} setEmulatorColumnError={setEmulatorColumnError} emulatorSessionIDError={emulatorSessionIDError} setEmulatorSessionIDError={setEmulatorSessionIDError}
                                                                 scriptError={scriptError} setScriptError={setScriptError} emulatorError={emulatorError} setEmulatorError={setEmulatorError}
                                                                 isDirty={isDirty} setIsDirty={(flag)=>{
                                                                    setIsDirty(flag);
                                                                    if(!flag){
                                                                        setRowValidationError(null)
                                                                    }  
                                                                }}   
                                                            />
                                            :
                                            selectedTabName === "Search" ?
                                                <div className={styles.contentDiv}>
                                                    <SearchTabComponent searchTitle={searchTabConfig.searchTitle} applyURL={searchTabConfig.applyURL} setProcessNotApplied={setProcessNotApplied}
                                                                        setSearchInAppliedWhileEdit={setSearchInAppliedWhileEdit} isDirty={isDirty} setIsDirty={(flag)=>{
                                                                            setIsDirty(flag);
                                                                            if(!flag){
                                                                                setRowValidationError(null)
                                                                            }
                                                    }}/>
                                                </div>
                                                :
                                                selectedTabName === "Viewer Settings" ?
                                                    <div className={styles.contentDiv}>
                                                        <ViewerSettingsTabComponent
                                                            isError={false}
                                                            showResultTableHeader={showResultTableHeader}
                                                            setShowResultTableHeader={setShowResultTableHeader}
                                                        />
                                                    </div>
                                                    :
                                                selectedTabName === "Roles" ?
                                                    <div className={styles.contentDiv}>
                                                        <RolesTabComponents title={title} setIsRolesListChange={setIsRolesListChange}/>
                                                    </div>
                                                    :
                                                    selectedTabName === "Route Destinations" ?
                                                        <div className={styles.contentDiv}>
                                                            <RouteDestineTabComponents setIsRolesListChange={setIsRolesListChange}/>
                                                        </div>
                                                        :
                                                        selectedTabName === "Route Reasons" ?
                                                            <div className={styles.contentDiv}>
                                                                <RouteReasonsTabComponents setIsRolesListChange={setIsRolesListChange}/>
                                                            </div>
                                                            :
                                                            selectedTabName === "Hold" ?
                                                                <div className={styles.contentDiv}>
                                                                    <HoldsTabComponents setIsRolesListChange={setIsRolesListChange} error={error} setError={setError} maxError={maxError} setMaxError={setMaxError}
                                                                                        maxDurUnitError={maxDurUnitError} durUnitError={durUnitError} setDurUnitError={setDurUnitError} setMaxDurUnitError={setMaxDurUnitError}/>
                                                                </div>
                                                                :
                                                              selectedTabName === "Matching Expression" ?
                                                                <div className={styles.contentDiv}>
                                                                    <MatchingExpressionsComponent fromCaseWorkbencRules={selectedSysManagerChild?.moduleName === "case.workbenchrules.config.context"} searchTitle={searchTabConfig.searchTitle} applyURL={searchTabConfig.applyURL} setProcessNotApplied={setProcessNotApplied}
                                                                                        setSearchInAppliedWhileEdit={setSearchInAppliedWhileEdit} isDirty={isDirty} checkfetchApi={checkFetchApi}  setCheckFetchApi={setCheckFetchApi} setIsDirty={(flag)=>{
                                                                        setIsDirty(flag);
                                                                        if(!flag){
                                                                            setRowValidationError(null)
                                                                        }
                                                                    }} targetErrorText={targetErrorText} setTargetErrorText={setTargetErrorText}
                                                                    />
                                                                </div>
                                                               :
                                                               selectedTabName === "Process/Steps" ?
                                                                   <ProcessStepsPopup 
                                                                     selectedViewStepsSelectorList={
                                                                        selectedViewStepsSelectorList
                                                                      }
                                                                   />
                                                               
                                                               :

                                                              null
                                    }
                                </div>
                            </span>}
                            </div>
                            {saveSearchLoading || saveConfigLoading &&
                            <ConfirmationDialog
                                width={300}
                                showDialog={true}
                                icon={<div className={styles.loadingGifStyle} />}
                                headerText={t('progress_popup_header')}
                                body={
                                    <Label>{t('SAVE_BUSY_MSG')}</Label>
                                }
                                divideByX={3}
                                divideByY={6}
                                transitionDuration={300}
                                isCloseButtonShown={false}
                                noButtonText={t('btn.common.cancel')}
                                onNoBtnClick={() => {
                                    dispatch(setSaveConfigLoading(false));
                                    dispatch(setSaveSearchLoading(false))
                                }}
                            />
                            }
                            {
                                openCancelPopup &&
                                <ConfirmationDialog
                                    showDialog={true}
                                    icon={<Icons icon={ICONS.QUESTION_MARK_ICON} />}
                                    headerText={'Cancel Confirmation'}
                                    width={400}
                                    divideByX={3}
                                    onYesBtnClick={onCancelContinueClick}
                                    yesButtonText={t('ipd.cag.yes')}
                                    noButtonText={t('ipd.cag.no')}
                                    onNoBtnClick={()=>{setOpenCancelPopup(false)}}
                                    isCloseButtonShown={true}
                                    onClose={()=>{setOpenCancelPopup(false)}}
                                    body={<div className={styles.bodyStyle}>
                                        <h4 className={styles.textStyle}>{t('DIRTY_FIELDS')}</h4>
                                        <h4 className={styles.textStyle}>{t('label_click')}<b>{t('ipd.cag.yes')}</b>{t('label_to_continue_or')}<b>{t('ipd.cag.no')}</b> {t('label_to_cancel')}
                                        </h4>
                                    </div>}
                                />
                            }
                            {
                                openValidationException &&
                                <ConfirmationDialog
                                    showDialog={true}
                                    icon={<Icons icon={ICONS.RED_ALERT_ICON} />}
                                    headerText={'Validation Exception'}
                                    width={600}
                                    divideByX={3}
                                    noButtonText={"OK"}
                                    onNoBtnClick={()=>{setOpenValidationException(false)}}
                                    isCloseButtonShown={true}
                                    onClose={()=>{setOpenValidationException(false)}}
                                    body={<div className={ title == t('sysmgr.case.worbench.rules.config.title') ? styles.caseRulesvalidationStyle : styles.validationStyle } style={title == t('sysmgr.historysearch.config.title') ? {} : {height: 100}}>
                                        <div className={styles.inlineDisplay}>
                                            <div className={styles.textStyle} style={{lineHeight:1.6}}>{
                                                "Please correct the fields marked as invalid and ensure required fields are populated. Invalid fields are marked as"}</div>
                                            <div className={styles.errorIcon}></div>
                                            <div style={{marginTop:"-14px", marginLeft: "75px"}}>{". Required fields are denoted by "}<span style={{color: "#9f0000", marginLeft: 2}}>*</span>.</div>
                                        </div>
                                        {
                                            rowValidationError ? <div className={styles.rowValidStyle} style={{height : title == t('sysmgr.case.worbench.rules.config.title') ? "auto" : "150px"}}>{rowValidationError}</div> :
                                                <div>
                                                    {!searchesConfigDetails?.name ?
                                                        <div className={styles.parentBullet}>
                                                            <div className={styles.bulletStyle}/>
                                                            {"Name is required."}
                                                        </div>
                                                        :
                                                        (searchesConfigDetails.name.includes("[") || searchesConfigDetails.name.includes("]") || errorText) &&
                                                        <div className={styles.parentBullet}>
                                                            <div className={styles.bulletStyle}/>
                                                            {"Name entered is not valid."}
                                                        </div>
                                                    }
                                                    {
                                                        searchesConfigDetails?.retrievalExpressions?.detailSet.length === 0 ?
                                                            <div className={styles.parentBullet}>
                                                                <div className={styles.bulletStyle}/>
                                                                {"At least one expression is required."}</div>
                                                            :
                                                            searchesConfigDetails?.retrievalExpressions?.detailSet.length > 0 && searchesConfigDetails?.retrievalExpressions?.detailSet[0].target === "" &&
                                                            targetOperatorSourceState && targetOperatorSourceState[0]?.selectedTarget === null &&

                                                            <div className={styles.parentBullet}>
                                                                <div className={styles.bulletStyle}/>
                                                                {"Target is required"}</div>
                                                    }
                                                    {searchesConfigDetails?.retrievalExpressions?.detailSet.length > 0 && searchesConfigDetails?.retrievalExpressions?.detailSet[0].operator === "" &&
                                                    targetOperatorSourceState[0]?.selectedOperator === null &&
                                                    <div className={styles.parentBullet}>
                                                        <div className={styles.bulletStyle}/>
                                                        {"Operator is required."}
                                                    </div>
                                                    }
                                                    {searchTabConfig.searchTitle === "Work Search" && (!searchesConfigDetails.searchInName || selectedSearchInObj?.name === "") && selectedSearchInObj?.id !== 0 ?
                                                        <div className={styles.parentBullet}>
                                                            <div className={styles.bulletStyle}/>
                                                            {"In is required."}
                                                        </div>
                                                        :
                                                        selectedSearchInObj && selectedSearchInObj.id === 0 &&
                                                        <div className={styles.parentBullet}>
                                                            <div className={styles.bulletStyle}/>
                                                            {"In entered is not valid. Please select a valid item from the selection list."}
                                                        </div>
                                                    }
                                                    {!searchesConfigDetails?.templateProcesses || searchesConfigDetails?.templateProcesses.length === 0 &&
                                                    <div className={styles.parentBullet}>
                                                        <div className={styles.bulletStyle}/>
                                                        {"Process entered is not valid. At least one item must be selected."}</div>
                                                    }
                                                    {
                                                        ((selectedSearchInObj && processNotApplied &&
                                                            targetOperatorSourceState[0]?.selectedTarget !== null && targetOperatorSourceState[0]?.selectedOperator !== null) || isDirty === false) &&
                                                        <div className={styles.parentBullet}>
                                                            <div className={styles.bulletStyle}/>
                                                            {"Filter criteria needs to be applied before saving."}</div>
                                                    }
                                                    
                                                </div>
                                        }
                                    </div>}
                                />

                            }
                            {
                                openGeneralValidation &&
                                <ConfirmationDialog
                                    showDialog={true}
                                    icon={<Icons icon={ICONS.RED_ALERT_ICON} />}
                                    headerText={'Validation Exception'}
                                    width={600}
                                    divideByX={3}
                                    noButtonText={"OK"}
                                    onNoBtnClick={()=>{setOpenGeneralValidation(false)}}
                                    isCloseButtonShown={true}
                                    onClose={()=>{setOpenGeneralValidation(false)}}
                                    body={<div className={styles.validationStyle} style={generalTabConfig.isFromEmulators || title == t('sysmgr.historysearch.config.title') ? {} : {height: 100} }>
                                        <div className={styles.inlineDisplay}>
                                            <div className={styles.textStyle} style={{lineHeight:1.6}}>{
                                                "Please correct the fields marked as invalid and ensure required fields are populated. Invalid fields are marked as"}</div>
                                            <div className={styles.errorIcon}></div>
                                            <div style={{marginTop:"-14px", marginLeft: "75px"}}>{". Required fields are denoted by"}<span style={{color: "#9f0000", marginLeft: 2}}>*</span>.</div>
                                        </div>
                                        <div>
                                            {
                                                generalTabConfig.isFromEmulators ?
                                                 (!searchesConfigDetails?.name ?
                                                 <div className={styles.parentBullet}>
                                                     <div className={styles.bulletStyle}/>
                                                     {"Name is required."}
                                                 </div>
                                                 :
                                                 (searchesConfigDetails.name.includes("[") || searchesConfigDetails.name.includes("]") || errorText) &&
                                                 <div className={styles.parentBullet}>
                                                     <div className={styles.bulletStyle}/>
                                                     {"Name entered is not valid."}
                                                 </div>)
                                                 :
                                                 <div className={styles.parentBullet}><div className={styles.bulletStyle}/>{searchesConfigDetails?.name.trim() === "" ? "Name is required." : "Name entered is not valid."}</div>
                                            }
                                            
                                            {                                                    
                                                ((!selectedEmulatorType || selectedEmulatorType?.name === "") && generalTabConfig.isFromEmulators && selectedEmulatorType?.id !== 0) ?
                                                    <div className={styles.parentBullet}>
                                                        <div className={styles.bulletStyle}/>
                                                        {"Emulator Type is required."}
                                                    </div>
                                                    :
                                                    
                                                    selectedEmulatorType && selectedEmulatorType?.id == 0 && generalTabConfig.isFromEmulators &&
                                                    <div className={styles.parentBullet}>
                                                        <div className={styles.bulletStyle}/>
                                                  {"Emulator Type entered is not valid. Please select a valid item from the selection list."}
                                                  </div>
                                            }
                                            
                                            {
                                                (emulatorRowError && generalTabConfig.isFromEmulators) && 
                                                <div className={styles.parentBullet}>
                                                        <div className={styles.bulletStyle}/>
                                                        {emulatorRowError}
                                                    </div>
                                            }
                                            {
                                                (emulatorColumnError && generalTabConfig.isFromEmulators) && 
                                                <div className={styles.parentBullet}>
                                                        <div className={styles.bulletStyle}/>
                                                        {emulatorColumnError}
                                                    </div>
                                            }
                                            {                                                    
                                                ((!searchesConfigDetails.sessionId || selectedEmulatorSessionId?.name === "") && generalTabConfig.isFromEmulators && selectedEmulatorSessionId?.id !== 0) ?
                                                    <div className={styles.parentBullet}>
                                                        <div className={styles.bulletStyle}/>
                                                        {"Sesssion ID is required"}
                                                    </div>
                                                    :
                                                    
                                                    selectedEmulatorSessionId && selectedEmulatorSessionId?.id == 0 && generalTabConfig.isFromEmulators &&
                                                    <div className={styles.parentBullet}>
                                                        <div className={styles.bulletStyle}/>
                                                  {"Sesssion ID entered is not valid. Please select a valid item from the selection list."}
                                                  </div>
                                            }
                                            
                                        </div>
                                    </div>}
                                />
                            }
                            {
                                openBackendException.length > 0 ?
                                    <ConfirmationDialog
                                        showDialog={true}
                                        icon={<Icons icon={ICONS.RED_ALERT_ICON} />}
                                        headerText={'Exception'}
                                        width={600}
                                        divideByX={3}
                                        noButtonText={"OK"}
                                        onNoBtnClick={()=>{setOpenBackendException("")}}
                                        isCloseButtonShown={true}
                                        onClose={()=>{setOpenBackendException("")}}
                                        body={<div className={styles.validationStyle} style={{height: 100}}>
                                            <div style={{margin: 10}}>{openBackendException}</div>
                                        </div>}
                                    />
                                    : null
                            }
                            {
                                openQueueValidationException ?
                                    <ConfirmationDialog
                                        showDialog={true}
                                        icon={<Icons icon={ICONS.RED_ALERT_ICON} />}
                                        headerText={'Validation Exception'}
                                        width={600}
                                        divideByX={3}
                                        onYesFocus={true}
                                        noButtonText={"OK"}
                                        onNoBtnClick={()=>{setOpenQueueValidationException(false)}}
                                        isCloseButtonShown={true}
                                        onClose={()=>{setOpenQueueValidationException(false)}}
                                        body={<div className={styles.validationStyle}>
                                            <div className={styles.inlineDisplay}>
                                                <div className={styles.textStyle} style={{lineHeight:1.6}}>{
                                                    "Please correct the fields marked as invalid and ensure required fields are populated. Invalid fields are marked as"}</div>
                                                <div className={styles.errorIcon}></div>
                                                <div style={{marginTop:"-14px", marginLeft: "75px"}}>{". Required fields are denoted by"}<span style={{color: "#9f0000", marginLeft: 2}}>*</span>.</div>
                                            </div>
                                            <div>
                                                {
                                                    searchesConfigDetails?.name.trim() === "" ?
                                                    <div className={styles.parentBullet}><div className={styles.bulletStyle}/>{"Name is required."}</div> :
                                                        errorText !== "" &&
                                                    <div className={styles.parentBullet}><div className={styles.bulletStyle}/>{"Name entered is not valid."}</div>
                                                }
                                                {
                                                    searchesConfigDetails?.description.trim() === "" ?
                                                        <div className={styles.parentBullet}><div className={styles.bulletStyle}/>{"Display Value is required."}</div>
                                                        : displayValueErrorText !== "" && <div className={styles.parentBullet}><div className={styles.bulletStyle}/>{"Display Value entered is not valid."}</div>
                                                }
                                                {
                                                    searchesConfigDetails?.defaultHoldDuration == "" ?
                                                        <div className={styles.parentBullet}><div className={styles.bulletStyle}/>{"Default Hold Duration is required."}</div> :
                                                        error !== "" &&  <div className={styles.parentBullet}><div className={styles.bulletStyle}/>{"Default Hold Duration entered is not valid."}</div>
                                                }
                                                {
                                                    searchesConfigDetails?.defaultHoldDurationUnit == "" ?
                                                        <div className={styles.parentBullet}><div className={styles.bulletStyle}/>{"Default Hold Duration Unit is required."}</div> :
                                                        durUnitError !== "" &&  <div className={styles.parentBullet}><div className={styles.bulletStyle}/>{"Default Hold Duration Unit entered is not valid."}</div>
                                                }
                                                {
                                                    searchesConfigDetails?.maxHoldDuration == "" ?
                                                        <div className={styles.parentBullet}><div className={styles.bulletStyle}/>{"Max Hold Duration is required."}</div> :
                                                        maxError !== "" &&  <div className={styles.parentBullet}><div className={styles.bulletStyle}/>{"Max Hold Duration entered is not valid."}</div>
                                                }
                                                {
                                                    searchesConfigDetails?.maxHoldDurationUnit == "" ?
                                                        <div className={styles.parentBullet}><div className={styles.bulletStyle}/>{"Max Hold Duration Unit is required."}</div> :
                                                        maxDurUnitError !== "" &&  <div className={styles.parentBullet}><div className={styles.bulletStyle}/>{"Max Hold Duration Unit entered is not valid."}</div>
                                                }
                                                {
                                                    showDurationError === true &&
                                                        <div className={styles.parentBullet}><div className={styles.bulletStyle}/>{"Default Hold Duration must be less than or equal to Max Hold Duration."}</div>
                                                }
                                            </div>
                                        </div>}
                                    />
                                    :
                                    null
                            }
                        </>
                    }
                    transitionDuration={300}
                    isCloseButtonShown={true}
                    noButtonText={showGlobalPopup === "showCriteriaDifference" ? t('sysmgr.common.label.close') : t('btn.common.cancel')}
                    onNoBtnClick={() => showGlobalPopup === "showCriteriaDifference" ? onCancelContinueClick() : onOkClose()}
                    yesButtonText={showGlobalPopup === "showCriteriaDifference" ? null : t('btn.common.ok')}
                    onYesBtnClick={() => handleOkClick()}
                    disableNo={openGeneralValidation || openValidationException}
                    disableYes={openGeneralValidation || openValidationException}
                />
                : null
            }
        </>
    );
};


