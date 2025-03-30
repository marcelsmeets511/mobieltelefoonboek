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
            'geslacht', 'plaatsnaam', 'land', 'status', 'bedrijfsnaam'
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
                name: 'telefoonnummer'
            },
            {
                fieldLabel: 'Facebook ID',
                name: 'facebookid'
            },
            {
                fieldLabel: 'Voornaam',
                name: 'voornaam'
            },
            {
                fieldLabel: 'Achternaam',
                name: 'achternaam'
            },
            {
                fieldLabel: 'Geslacht',
                name: 'geslacht'
            },
            {
                fieldLabel: 'Plaatsnaam',
                name: 'plaatsnaam'
            },
            {
                fieldLabel: 'Land',
                name: 'land'
            },
            {
                fieldLabel: 'Status',
                name: 'status'
            },
            {
                fieldLabel: 'Bedrijfsnaam',
                name: 'bedrijfsnaam'
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
                cls: 'search-column',
                //flex: 1,
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
                cls: 'search-column',
                //flex: 1,
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
                cls: 'search-column',
                //flex: 1,
                renderer: function(value) {
                    if (value) {
                        return '<a href="https://mobieltelefoonboek.onrender.com/searchagain?voornaam=' + value + '" target="_blank">' + value + '</a>';
                    }
                    return '';
                }
            },
            {
                text: 'Achternaam',
                dataIndex: 'achternaam',
                cls: 'search-column',
                //flex: 1,
                renderer: function(value) {
                    if (value) {
                        return '<a href="https://mobieltelefoonboek.onrender.com/searchagain?achternaam=' + value + '" target="_blank">' + value + '</a>';
                    }
                    return '';
                }
            },
            {
                text: 'Geslacht',
                dataIndex: 'geslacht',
                cls: 'search-column',
                //flex: 1,
                renderer: function(value) {
                    if (value) {
                        return '<a href="https://mobieltelefoonboek.onrender.com/searchagain?geslacht=' + value + '" target="_blank">' + value + '</a>';
                    }
                    return '';
                }
            },
            {
                text: 'Plaatsnaam',
                dataIndex: 'plaatsnaam',
                cls: 'search-column',
                //flex: 1,
                renderer: function(value) {
                    if (value) {
                        return '<a href="https://mobieltelefoonboek.onrender.com/searchagain?plaatsnaam=' + value + '" target="_blank">' + value + '</a>';
                    }
                    return '';
                }
            },
            {
                text: 'Land',
                dataIndex: 'land',
                cls: 'search-column',
                //flex: 1,
                renderer: function(value) {
                    if (value) {
                        return '<a href="https://mobieltelefoonboek.onrender.com/searchagain?land=' + value + '" target="_blank">' + value + '</a>';
                    }
                    return '';
                }
            },
            {
                text: 'Status',
                dataIndex: 'status',
                cls: 'search-column',
                //flex: 1,
                renderer: function(value) {
                    if (value) {
                        return '<a href="https://mobieltelefoonboek.onrender.com/searchagain?status=' + value + '" target="_blank">' + value + '</a>';
                    }
                    return '';
                }
            },
            {
                text: 'Bedrijfsnaam',
                dataIndex: 'bedrijfsnaam',
                cls: 'search-column',
                //flex: 1,
                renderer: function(value) {
                    if (value) {
                        return '<a href="https://mobieltelefoonboek.onrender.com/searchagain?bedrijfsnaam=' + value + '" target="_blank">' + value + '</a>';
                    }
                    return '';
                }
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
