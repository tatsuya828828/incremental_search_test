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
			$('#result').find('li').remove(); // idがresultの子要素のliを文字入力のたびに一旦削除する
			$(data).each(function(i,user){ // dataをuserという変数に代入して、以下のことを繰り返し行う
				$('#result').append('<li>' + user.name + '</li>') // id="result"に対して、<li>ユーザーの名前</li>を追加する
			});
		})
	});
});