<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('register', 'UserController@register');
Route::post('login', 'UserController@authenticate');
Route::post('set-user-score', 'UserController@setUserScore');

Route::get('open', 'DataController@open');

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('user', 'UserController@getAuthenticatedUser');
    Route::get('closed', 'DataController@closed');
});

Route::post('quiz','QuizesController@store');
Route::post('get-quizes', 'QuizesController@getQuizes');
Route::post('get-quiz', 'QuizesController@getQuizByID');

Route::post('quiz_result','QuizesResultsController@store');
Route::post('user-tests','QuizesController@getUserQuizes');
Route::post('user-tests-finished','QuizesController@getUserFinishedQuizes');

Route::delete('delete-test','QuizesController@deleteQuiz');
