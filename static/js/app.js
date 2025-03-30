Ext.onReady(function() {
    // Configure Ext.js for responsive design
/*    Ext.override(Ext.container.Container, {
        responsiveConfig: {
            'width < 768': {
                layout: 'vbox'
            },
            'width >= 768': {
                layout: 'hbox'
            }
        }
    });*/

    // Define the data model for search results
    Ext.define('SearchResult', {
        extend: 'Ext.data.Model',
        fields: [
            'telefoonnummer', 'facebookid', 'voornaam', 'achternaam', 
            'geslacht', 'plaatsnaam', 'geboorteplaats', 'status', 'bedrijfsnaam'
        ]
    });

    // Create a store for the search results
    var searchResultsStore = Ext.create('Ext.data.Store', {
        model: 'SearchResult',
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    });

    // Create the search form
    var searchForm = Ext.create('Ext.form.Panel', {
        title: 'Zoek Profielen',
        cls: 'search-form',
        bodyPadding: 10,
        width: '100%',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        defaults: {
            xtype: 'textfield',
            labelAlign: 'top',
            margin: '0 0 10 0'
        },
        items: [
            {
                fieldLabel: 'Telefoonnummer',
                name: 'telefoonnummer',
                emptyText: 'Voer telefoonnummer in...'
            },
            {
                fieldLabel: 'Facebook ID',
                name: 'facebookid',
                emptyText: 'Voer Facebook ID in...'
            },
            {
                fieldLabel: 'Voornaam',
                name: 'voornaam',
                emptyText: 'Voer voornaam in...'
            },
            {
                fieldLabel: 'Achternaam',
                name: 'achternaam',
                emptyText: 'Voer achternaam in...'
            },
            {
                fieldLabel: 'Geslacht',
                name: 'geslacht',
                emptyText: 'Voer geslacht in...'
            },
            {
                fieldLabel: 'Plaatsnaam',
                name: 'plaatsnaam',
                emptyText: 'Voer plaatsnaam in...'
            },
            {
                fieldLabel: 'Geboorteplaats',
                name: 'geboorteplaats',
                emptyText: 'Voer geboorteplaats in...'
            },
            {
                fieldLabel: 'Status',
                name: 'status',
                emptyText: 'Voer status in...'
            },
            {
                fieldLabel: 'Bedrijfsnaam',
                name: 'bedrijfsnaam',
                emptyText: 'Voer bedrijfsnaam in...'
            }
        ],
        buttons: [
            {
                text: 'Zoeken',
                formBind: true,
                handler: function() {
                    var form = this.up('form');
                    if (form.isValid()) {
                        form.submit({
                            url: '/search',
                            method: 'POST',
                            waitMsg: 'Zoeken...',
                            success: function(form, action) {
                                searchResultsStore.loadRawData(action.result);
                                Ext.getCmp('search-results-grid').setVisible(true);
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Fout', 'Er is een fout opgetreden bij het zoeken.');
                            }
                        });
                    }
                }
            },
            {
                text: 'Reset',
                handler: function() {
                    this.up('form').getForm().reset();
                    searchResultsStore.removeAll();
                    Ext.getCmp('search-results-grid').setVisible(false);
                }
            }
        ]
    });

    // Create the results grid
    var resultsGrid = Ext.create('Ext.grid.Panel', {
        id: 'search-results-grid',
        title: 'Zoekresultaten',
        cls: 'search-results',
        store: searchResultsStore,
        hidden: true,
        width: '100%',
        flex: 1,
        columns: [
            {
                text: 'Telefoonnummer',
                dataIndex: 'telefoonnummer',
                flex: 1,
                renderer: function(value) {
                    if (value) {
                        return '<a href="tel://' + value + '">' + value + '</a>';
                    }
                    return '';
                }
            },
            {
                text: 'Facebook ID',
                dataIndex: 'facebookid',
                flex: 1,
                renderer: function(value) {
                    if (value) {
                        return '<a href="https://facebook.com/' + value + '" target="_blank">' + value + '</a>';
                    }
                    return '';
                }
            },
            {
                text: 'Voornaam',
                dataIndex: 'voornaam',
                flex: 1
            },
            {
                text: 'Achternaam',
                dataIndex: 'achternaam',
                flex: 1
            },
            {
                text: 'Geslacht',
                dataIndex: 'geslacht',
                flex: 1
            },
            {
                text: 'Plaatsnaam',
                dataIndex: 'plaatsnaam',
                flex: 1
            },
            {
                text: 'Geboorteplaats',
                dataIndex: 'geboorteplaats',
                flex: 1
            },
            {
                text: 'Status',
                dataIndex: 'status',
                flex: 1
            },
            {
                text: 'Bedrijfsnaam',
                dataIndex: 'bedrijfsnaam',
                flex: 1
            }
        ],
        viewConfig: {
            enableTextSelection: true
        }
    });

    // Create the main container
    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [
            {
                xtype: 'container',
                padding: 20,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [searchForm, resultsGrid]
            }
        ]
    });
});
