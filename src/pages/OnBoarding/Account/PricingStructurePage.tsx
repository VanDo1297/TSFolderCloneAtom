import React from "react";
import * as H from "history";
import withApiHandler, {
  ErrorHandler,
  InjectedApiHandlerProps,
} from "../../../components/hocs/WithApiHandler";
import withSystemState, {
  InjectedSystemStateProps,
} from "../../../components/hocs/WithSystemState";
import Header from "../../../components/headers";
import Sliders from "../../../components/sliders";
import "../../../sass/pages/SetupPricingPage.scss";
import "../../../sass/common.scss";
import Button from "react-bootstrap/Button";
import Checkbox from "../../../components/checkbox";
import Radio from "../../../components/radio";
import _ from "lodash";

import PricingStructureState from './State/PricingStructureState';

//getAtomProducts
interface PricingStructurePageBaseProps {
  history: H.History;
}

type PricingStructurePageProps = PricingStructurePageBaseProps &
  InjectedApiHandlerProps &
  InjectedSystemStateProps;

class PricingStructurePage extends React.Component<
  PricingStructurePageProps,
  PricingStructureState
  > {
  state = {
    coverImage: {
      preview: "",
      raw: "",
    },
    logoImage: {
      preview: "",
      raw: "",
    },
    check: [],
    radioMonthly: [],
    radioQuarterly: [],
    radioVirual: [],
    radioOneTime: [],
    valueOneTime: "",
    valueVirtual: "",
    valueMonthly: "",
    valueQuarterly: "",
    valueCostOneTime: "",
    valueCostVirtual: "",
    valueCostMonthly: "",
    valueCostQuarterly: "",
  };
  handleCheck = (value: never) => {
    if (_.indexOf(this.state.check, value) !== -1) {
      this.state.check.splice(_.indexOf(this.state.check, value), 1);
      this.setState({
        check: [...this.state.check],
      });
    } else {
      this.setState({
        check: [...this.state.check, value],
      });
    }
  };

  //#region  handleCostInput
  handleCostInputOneTime = (e: any) => {
    if (!_.isNaN(Number(e.target.value))) {
      this.setState({
        valueCostOneTime: e.target.value,
      });
    }
  };

  handleCostInputVirtual = (e: any) => {
    if (!_.isNaN(Number(e.target.value))) {
      this.setState({
        valueCostVirtual: e.target.value,
      });
    }
  };

  handleCostInputMonthly = (e: any) => {
    if (!_.isNaN(Number(e.target.value))) {
      this.setState({
        valueCostMonthly: e.target.value,
      });
    }
  };

  handleCostInputQuarterly = (e: any) => {
    if (!_.isNaN(Number(e.target.value))) {
      this.setState({
        valueCostQuarterly: e.target.value,
      });
    }
  };
  //#endregion

  //#region handleInput

  handleChangeInputOneTime = (e: any) => {
    if (!_.isNaN(Number(e.target.value))) {
      this.setState({
        valueOneTime: e.target.value,
      });
    }
  };

  handleChangeInputVirtual = (e: any) => {
    if (!_.isNaN(Number(e.target.value))) {
      this.setState({
        valueVirtual: e.target.value,
      });
    }
  };
  handleChangeInputMonthly = (e: any) => {
    if (!_.isNaN(Number(e.target.value))) {
      this.setState({
        valueMonthly: e.target.value,
      });
    }
  };
  handleChangeInputQuarterly = (e: any) => {
    if (!_.isNaN(Number(e.target.value))) {
      this.setState({
        valueQuarterly: e.target.value,
      });
    }
  };

  //#endregion

  //#region handleRadio

  handleRadioMonthly = (value: never) => {
    this.setState({
      radioMonthly: [value],
    });
  };

  handleRadioQuarterly = (value: never) => {
    this.setState({
      radioQuarterly: [value],
    });
  };
  handleRadioVirtual = (value: never) => {
    this.setState({
      radioVirual: [value],
    });
  };
  handleRadioOneTime = (value: never) => {
    this.setState({
      radioOneTime: [value],
    });
  };

  //#endregion

  handleNext = () => {
    this.props.updateSetupScreen(this.props.systemState.setupScreen + 1);
  };
  handleBack = () => {
    this.props.updateSetupScreen(this.props.systemState.setupScreen - 1);
  };

  renderItem = (
    nameCheckBox: string,
    descTitle: string,
    descSubTitle: string,
    handleRadio: any,
    checkRadio: any,
    valueInput: string,
    handleChangeInput: any,
    valueCostInput: string,
    handleChangeCostInput: any
  ) => {
    return (
      <div className="setup-pricing-item d-flex flex-row pt-4 pb-4">
        <div className="d-flex flex-row w-100 ">
          <Checkbox
            name={nameCheckBox}
            check={this.state.check}
            handleCheck={this.handleCheck}
          />
          <div className="d-flex flex-column w-100 ml-4">
            <div className=" setup-pricing-item-checkbox d-flex flex-row w-100">
              <div className="d-flex flex-column">
                <span
                  className={`setup-pricing-desc-title ${
                    _.indexOf(this.state.check, nameCheckBox) !== -1
                      ? "text-active"
                      : ""
                    }`}
                >
                  {descTitle}
                </span>
                <span className="font-italic setup-pricing-desc-sub-title">
                  {descSubTitle}
                </span>
              </div>
              {_.indexOf(this.state.check, nameCheckBox) !== -1 && (
                <p
                  style={{ height: "35px" }}
                  className="align-items-center d-flex flex-row ml-auto text-active"
                >
                  $
                  <input
                    style={{
                      width: "100px",
                      marginLeft: "15px",
                      paddingLeft: "10px",
                    }}
                    placeholder="cost"
                    value={valueCostInput}
                    onChange={handleChangeCostInput}
                  ></input>
                </p>
              )}
            </div>
            {_.indexOf(this.state.check, nameCheckBox) !== -1 && (
              <>
                <Radio
                  check={checkRadio}
                  handleRadio={handleRadio}
                  name="bill-on-start-date-month"
                  text="Bill on Start Date"
                />
                <Radio
                  check={checkRadio}
                  children={
                    <div
                      className={`${
                        _.indexOf(checkRadio, "bill-on-month-month") !== -1
                          ? "font-weight-bold"
                          : "text-dark"
                        }`}
                    >
                      <span>Bill on </span>
                      <input
                        style={{ width: "40px", textAlign: "center" }}
                        placeholder="dd"
                        onChange={handleChangeInput}
                        value={valueInput}
                      ></input>
                      <span>{` of every month`}</span>
                    </div>
                  }
                  name="bill-on-month-month"
                  handleRadio={handleRadio}
                />
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  renderContent = () => {
    return (
      <div className="setup-pricing-content-section w-100 d-flex flex-row">
        <div className="w-50 d-flex flex-column p-5 setup-pricing-left mt-5">
          <p className=" setup-pricing-left-title">Pricing Structure</p>
          <p className="setup-pricing-left-sub-title mt-4">
            <span> Welcome! Let’s start off by adding some</span>
            <br />
            <span> detail to your brand. You can change these</span>
            <br />
            <span> items at any time.</span>
          </p>
          <span className="text-purple mt-2">
            Pricing Question?{" "}
            <span className="text-underline pointer">Reach out.</span>
          </span>
        </div>
        <div className="w-50 d-flex flex-column p-5 setup-pricing-right mt-5">
          <div className="setup-pricing-line" />
          {this.renderItem(
            "drop-1",
            "Drop in, one time",
            "Allow customers to attend on a per-visit basis.",
            this.handleRadioOneTime,
            this.state.radioOneTime,
            this.state.valueOneTime,
            this.handleChangeInputOneTime,
            this.state.valueCostOneTime,
            this.handleCostInputOneTime
          )}
          <div className="setup-pricing-line" />
          {this.renderItem(
            "drop-2",
            "Drop in, virtual",
            "Allow customers to attend virtual coaching on a per-visit basis.",
            this.handleRadioVirtual,
            this.state.radioVirual,
            this.state.valueVirtual,
            this.handleChangeInputVirtual,
            this.state.valueCostVirtual,
            this.handleCostInputVirtual
          )}
          <div className="setup-pricing-line" />
          {this.renderItem(
            "drop-monthly",
            "Monthly Plan",
            "Unlimited visits, billed monthly.",
            this.handleRadioMonthly,
            this.state.radioMonthly,
            this.state.valueMonthly,
            this.handleChangeInputMonthly,
            this.state.valueCostMonthly,
            this.handleCostInputMonthly
          )}
          <div className="setup-pricing-line" />
          {this.renderItem(
            "drop-quarterly",
            "Quarterly Plan",
            "Unlimited visits, billed quartely.",
            this.handleRadioQuarterly,
            this.state.radioQuarterly,
            this.state.valueQuarterly,
            this.handleChangeInputQuarterly,
            this.state.valueCostQuarterly,
            this.handleCostInputQuarterly
          )}
        </div>
      </div>
    );
  };
  renderFooter = () => {
    return (
      <div className="setup-pricing-footer d-flex justify-content-center align-items-center">
        <div
          onClick={this.handleBack}
          className="ml-5 setup-button-back-container"
        >
          <Button className="setup-button-back"></Button>
        </div>
        <div onClick={this.handleNext} className="ml-auto setup-button mr-3">
          <Button className="setup-button-next">Next</Button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <>
        <Header color="#F3EFEB"></Header>
        <Sliders
          history={this.props.history}
          handleSkip={this.handleNext}
          index={this.props.systemState.setupScreen}
        ></Sliders>
        <div className="w-100 setup-pricing-container d-flex justify-content-center flex-column align-items-center">
          <div className="setup-pricing-section">{this.renderContent()}</div>
          {this.renderFooter()}
        </div>
      </>
    );
  }
}

export default withSystemState(
  withApiHandler(PricingStructurePage, ErrorHandler.TOAST)
);
