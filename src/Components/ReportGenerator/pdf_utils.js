export function p (text){

    return '<p>'+String(text) +'</p>'
}
export function img(src){
    return '<img alt = "error" src="'+String(src)+'"></img>'
}
export function div(child){
    return '<div>'+child+'</div>'
}
export function h1(child){
    return '<h1>'+ String(child)+ '</h1>'
}
export function bootstrap(){
    return '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">'
}
export function withTheme(){

    return '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css" integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous"> '
}
export function head(child){
    return '<head>'+child+'</head>'
}
export function sbody(){

    return '<body>'
}
export function ebody(){
    return '</body>'
}