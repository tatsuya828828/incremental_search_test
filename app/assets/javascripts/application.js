// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

$(document).on('turbolinks:load', function(){ // turbolinksを先に読み込む
	$(document).on('keyup', '#form', function(e){ // このアプリケーション(document)の、id="form"で、キーボードが押され指が離れた瞬間(.on('keyup'...))、eという引数をとって以下のことをしなさい(function(e))
		e.preventDefault(); // キャンセル可能なイベントをキャンセル
		var input = $.trim($(this).val());
		$.ajax({ // ajax通信で以下のことを行う
			url: '/users/search', // urlを指定
			type: 'GET', // メソッドを指定
			data: ('keyword=' + input), // コントローラーに渡すデータを'keyword=input(入力された文字)'にするように指定
			processData: false,
			contentType: false,
			dataType: 'json' // データ形式を指定
		})
		.done(function(data){ // データを受け取ることに成功したら、dataを引数にとって以下の子をする(今回はdataに@usersが入っている)
			$('#result').find('p').remove(); // idがresultの子要素のpを文字入力のたびに一旦削除する
			$(data).show(function(){
				$('#result').append('<p style="color: red;">' + '既に使われています' + '</p>') // id="result"に対して、ユーザーの名前がすでに使われている場合文言を表示する
			});
		})
	});
});