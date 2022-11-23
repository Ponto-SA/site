function gerarPDF() {
    var relatorio = tabela_ponto.innerHTML; 
    var doc = new jsPDF()
    doc.fromHTML("<h1>**********Relatorio de Ponto*********</h1>" + relatorio ,33,2);
    doc.save('RelatorioPonto.pdf');
}



