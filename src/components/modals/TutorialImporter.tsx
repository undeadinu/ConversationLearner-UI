/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */
import * as React from 'react'
import * as OF from 'office-ui-fabric-react'
import { FM } from '../../react-intl-messages'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import { AppBase } from '@conversationlearner/models'
import { formatMessageId } from '../../Utils/util'
import FormattedMessageId from '../FormattedMessageId'
import { injectIntl, InjectedIntl, InjectedIntlProps } from 'react-intl'
import ReactPlayer from 'react-player'
import * as ReactMarkdown from 'react-markdown'

interface IRenderableColumn extends OF.IColumn {
    render: (app: AppBase, component: TutorialImporter) => React.ReactNode
}

function getColumns(intl: InjectedIntl): IRenderableColumn[] {
    return [
        {
            key: 'select',
            name: '',
            fieldName: 'actionId',
            minWidth: 80,
            maxWidth: 80,
            isResizable: true,
            render: (tutorial, component) => {
                let disabled = component.props.apps.filter(a => a.appName === tutorial.appName).length > 0;
                return (
                    <OF.PrimaryButton
                        disabled={disabled}
                        onClick={() => component.handleTutorialSelection(tutorial)}
                        ariaDescription={formatMessageId(intl, FM.BUTTON_IMPORT)}
                        text={formatMessageId(intl, FM.BUTTON_IMPORT)}
                    />
                )
            }
        },
        {
            key: 'select',
            name: '',
            fieldName: 'actionId',
            minWidth: 80,
            maxWidth: 80,
            isResizable: true,
            render: (tutorial, component) => {
                return (
                    <OF.DefaultButton
                        onClick={() => component.onClickInfo(tutorial)}
                        ariaDescription={formatMessageId(intl, FM.BUTTON_INFO)}
                        text={formatMessageId(intl, FM.BUTTON_INFO)}
                    />
                )
            }
        },
        {
            key: 'select',
            name: '',
            fieldName: 'actionId',
            minWidth: 300,
            maxWidth: 500,
            isResizable: true,
            render: (tutorial, component) => {
                return <span className={OF.FontClassNames.mediumPlus}>{tutorial.appName}</span>
            }
        }
    ]
}

interface ComponentState {
    columns: IRenderableColumn[]
    moreInfoApp: AppBase | null
}

class TutorialImporter extends React.Component<Props, ComponentState> {

    constructor(props: Props) {
        super(props)
        const columns = getColumns(this.props.intl)
        this.state = {
            columns,
            moreInfoApp: null
        }
    }

    handleTutorialSelection(tutorial: AppBase) {
        this.props.onTutorialSelected(tutorial);
        this.props.handleClose();
    }

    @OF.autobind
    onClickInfo(tutorial: AppBase) {
        this.setState({
            moreInfoApp: tutorial
        })
    }

    @OF.autobind
    onCloseInfo() {
        this.setState({
            moreInfoApp: null
        })
    }

    sortTutorials(): AppBase[] {
        if (this.props.tutorials) {
            let tutorials = [...this.props.tutorials];
            tutorials
                .sort((a, b) => {
                    return a.appName.localeCompare(b.appName)
                })

            return tutorials;
        }
        return []
    }

    render() {
        const { intl } = this.props
        const tutorials = this.sortTutorials()
        return (
            <Modal
                isOpen={this.props.open}
                isBlocking={false}
                containerClassName="cl-modal cl-modal--medium"
                key={(this.state.moreInfoApp === null) ? 'list' : 'info'}  // Keeps scroll position isolated
            >
                {this.state.moreInfoApp === null ?
                    <div className="cl-modal_header">
                        <span className={OF.FontClassNames.xxLarge}>
                            <FormattedMessageId id={FM.TUTORIALIMPORTER_TITLE} />
                        </span>
                    </div> :
                    <div />
                }
                <div className="cl-modal_body">
                    {this.state.moreInfoApp === null ?
                        <OF.DetailsList
                            className={OF.FontClassNames.mediumPlus}
                            items={tutorials}
                            columns={this.state.columns}
                            onRenderItemColumn={(app, i, column: IRenderableColumn) => column.render(app, this)}
                            checkboxVisibility={OF.CheckboxVisibility.hidden}
                        />
                        :
                        <div>
                            {this.state.moreInfoApp && this.state.moreInfoApp.metadata && this.state.moreInfoApp.metadata.markdown &&
                                <ReactMarkdown source={this.state.moreInfoApp.metadata.markdown} />
                            }
                            {this.state.moreInfoApp && this.state.moreInfoApp.metadata && this.state.moreInfoApp.metadata.video &&
                                <ReactPlayer
                                    url={this.state.moreInfoApp.metadata.video}
                                    controls={true}
                                />
                            }
                        </div>
                    }
                </div>

                <div className="cl-modal_footer cl-modal-buttons">
                    <div className="cl-modal-buttons_secondary" />
                    <div className="cl-modal-buttons_primary">
                        {this.state.moreInfoApp === null ?
                            <OF.PrimaryButton
                                onClick={this.props.handleClose}
                                ariaDescription={formatMessageId(intl, FM.BUTTON_CANCEL)}
                                text={formatMessageId(intl, FM.BUTTON_CANCEL)}
                            />
                            :
                            <OF.PrimaryButton
                                onClick={() => this.setState({ moreInfoApp: null })}
                                ariaDescription={formatMessageId(intl, FM.BUTTON_OK)}
                                text={formatMessageId(intl, FM.BUTTON_OK)}
                            />
                        }
                    </div>
                </div>
            </Modal>
        );

    }
}

interface ReceivedProps {
    open: boolean,
    onTutorialSelected: (tutorial: AppBase) => void;
    handleClose: () => void;
    apps: AppBase[];
    tutorials: AppBase[];
}

type Props = ReceivedProps & InjectedIntlProps;

export default injectIntl(TutorialImporter)