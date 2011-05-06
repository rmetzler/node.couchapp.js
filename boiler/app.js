 var couchapp = require('couchapp')
  , path = require('path')
  ;

ddoc = 
  { _id:'_design/app'
  , rewrites: 
    [ {from:"/", to:'index.html'}
    , {from:"cache.manifest", to:'_show/cache'}
    , {from:"favicon.ico", to:'vendor/couchdb.ico'}
    , {from:"favicon.png", to:'vendor/couchdb.ico'}
    , {from:"vendor/*", to:'vendor/*'}
    , {from:"/api", to:'../../'}    
    , {from:"/api/*", to:'../../*'}
    , {from:"/*", to:'*'}
    ]
  , shows: {
      cache: function(head, req) {
        return {
          "headers": { 
            "Content-Type": "text/cache-manifest"
          },
          "body": "CACHE MANIFEST\n/index.html"
        }
      }
    }
  }
  ;

ddoc.views = {};

ddoc.validate_doc_update = function (newDoc, oldDoc, userCtx) {   
  if (newDoc._deleted === true && userCtx.roles.indexOf('_admin') === -1) {     
    throw "Only admin can delete documents on this database.";
  } 
}

couchapp.loadAttachments(ddoc, path.join(__dirname, 'attachments'));

module.exports = ddoc;